import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: number;
  name: string;
  email: string;
  status: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    expiresAt: string;
  };
  timestamp: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  code: string;
  timestamp: string;
}

class AuthService {
  // Keys para AsyncStorage
  private readonly STORAGE_KEYS = {
    TOKEN: '@auth:token',
    USER: '@auth:user',
    EXPIRY: '@auth:expiry',
    LOGIN_DATE: '@auth:loginDate',
  };

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      const response = await api.post<AuthResponse>('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { user, token, expiresAt } = response.data.data;
        
        // Guardar token, usuario y fecha de login en AsyncStorage (persistente)
        await AsyncStorage.multiSet([
          [this.STORAGE_KEYS.TOKEN, token],
          [this.STORAGE_KEYS.USER, JSON.stringify(user)],
          [this.STORAGE_KEYS.EXPIRY, expiresAt],
          [this.STORAGE_KEYS.LOGIN_DATE, new Date().toISOString()],
        ]);

        console.log('✅ Sesión guardada en AsyncStorage (persistente por 30 días)');
        return { success: true, user, token };
      }

      return { success: false, error: response.data.message };
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response?.data?.message) {
        return { success: false, error: error.response.data.message };
      }
      
      if (error.code === 'ECONNABORTED') {
        return { success: false, error: 'Tiempo de espera agotado. Verifica tu conexión.' };
      }
      
      if (error.message === 'Network Error') {
        return { success: false, error: 'Error de red. Verifica tu conexión a internet.' };
      }

      return { success: false, error: 'Error al iniciar sesión. Intenta nuevamente.' };
    }
  }

  /**
   * Register new user
   */
  async register(name: string, email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      const response = await api.post<AuthResponse>('/api/auth/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const { user, token, expiresAt } = response.data.data;
        
        // Guardar token, usuario y fecha de registro en AsyncStorage (persistente)
        await AsyncStorage.multiSet([
          [this.STORAGE_KEYS.TOKEN, token],
          [this.STORAGE_KEYS.USER, JSON.stringify(user)],
          [this.STORAGE_KEYS.EXPIRY, expiresAt],
          [this.STORAGE_KEYS.LOGIN_DATE, new Date().toISOString()],
        ]);

        console.log('✅ Usuario registrado y sesión guardada en AsyncStorage');
        return { success: true, user, token };
      }

      return { success: false, error: response.data.message };
    } catch (error: any) {
      console.error('Register error:', error);
      
      if (error.response?.data?.message) {
        return { success: false, error: error.response.data.message };
      }

      return { success: false, error: 'Error al registrar usuario. Intenta nuevamente.' };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Intentar cerrar sesión en el servidor
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Siempre limpiar el storage local
      await AsyncStorage.multiRemove([
        this.STORAGE_KEYS.TOKEN,
        this.STORAGE_KEYS.USER,
        this.STORAGE_KEYS.EXPIRY,
        this.STORAGE_KEYS.LOGIN_DATE,
      ]);
      console.log('🔓 Sesión cerrada y caché limpiado');
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await api.get<{ success: boolean; data: { user: User } }>('/api/auth/me');

      if (response.data.success) {
        const { user } = response.data.data;
        
        // Actualizar usuario en AsyncStorage (mantener sincronizado)
        await AsyncStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));

        return { success: true, user };
      }

      return { success: false, error: 'No se pudo obtener el perfil' };
    } catch (error: any) {
      console.error('Get current user error:', error);
      
      if (error.response?.status === 401) {
        // Token expirado, limpiar caché
        await this.logout();
        return { success: false, error: 'Sesión expirada' };
      }

      return { success: false, error: 'Error al obtener perfil' };
    }
  }

  /**
   * Verify token validity
   */
  async verifyToken(): Promise<boolean> {
    try {
      const response = await api.get('/api/auth/verify');
      return response.data.success === true;
    } catch (error) {
      console.error('Verify token error:', error);
      return false;
    }
  }

  /**
   * Get stored user from AsyncStorage (caché persistente)
   */
  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(this.STORAGE_KEYS.USER);
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Get stored user error:', error);
      return null;
    }
  }

  /**
   * Get stored token from AsyncStorage (caché persistente)
   */
  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Get stored token error:', error);
      return null;
    }
  }

  /**
   * Check if token is expired (30 días)
   */
  async isTokenExpired(): Promise<boolean> {
    try {
      const expiryDate = await AsyncStorage.getItem(this.STORAGE_KEYS.EXPIRY);
      if (!expiryDate) return true;

      const now = new Date();
      const expiry = new Date(expiryDate);
      
      const isExpired = now >= expiry;
      
      if (isExpired) {
        console.log('⚠️ Token expirado (30 días cumplidos)');
        await this.logout(); // Limpiar caché automáticamente
      }
      
      return isExpired;
    } catch (error) {
      console.error('Check token expiry error:', error);
      return true;
    }
  }

  /**
   * Get session info (útil para debugging)
   */
  async getSessionInfo(): Promise<{
    hasToken: boolean;
    hasUser: boolean;
    loginDate: string | null;
    expiryDate: string | null;
    daysRemaining: number | null;
  }> {
    try {
      const token = await this.getStoredToken();
      const user = await this.getStoredUser();
      const loginDate = await AsyncStorage.getItem(this.STORAGE_KEYS.LOGIN_DATE);
      const expiryDate = await AsyncStorage.getItem(this.STORAGE_KEYS.EXPIRY);
      
      let daysRemaining = null;
      if (expiryDate) {
        const now = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry.getTime() - now.getTime();
        daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      return {
        hasToken: !!token,
        hasUser: !!user,
        loginDate,
        expiryDate,
        daysRemaining,
      };
    } catch (error) {
      console.error('Get session info error:', error);
      return {
        hasToken: false,
        hasUser: false,
        loginDate: null,
        expiryDate: null,
        daysRemaining: null,
      };
    }
  }

  /**
   * Clear all stored data (útil para debugging o reset)
   */
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.STORAGE_KEYS.TOKEN,
        this.STORAGE_KEYS.USER,
        this.STORAGE_KEYS.EXPIRY,
        this.STORAGE_KEYS.LOGIN_DATE,
      ]);
      console.log('🗑️ Todos los datos de autenticación eliminados');
    } catch (error) {
      console.error('Clear all data error:', error);
    }
  }
}

export default new AuthService();
