import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);

      // Verificar si hay token almacenado en caché (AsyncStorage)
      const token = await authService.getStoredToken();
      if (!token) {
        console.log('ℹ️ No hay token guardado - usuario no autenticado');
        setUser(null);
        return;
      }

      console.log('🔍 Token encontrado en caché - verificando validez...');

      // Verificar si el token está expirado (30 días)
      const isExpired = await authService.isTokenExpired();
      if (isExpired) {
        console.log('❌ Token expirado (30 días) - limpiando caché');
        await authService.logout();
        setUser(null);
        return;
      }

      // Obtener información de la sesión
      const sessionInfo = await authService.getSessionInfo();
      console.log('📊 Sesión activa:', {
        diasRestantes: sessionInfo.daysRemaining,
        fechaLogin: sessionInfo.loginDate,
        fechaExpiracion: sessionInfo.expiryDate,
      });

      // Obtener usuario almacenado en caché
      const storedUser = await authService.getStoredUser();
      if (storedUser) {
        console.log('✅ Usuario recuperado de caché:', storedUser.name);
        setUser(storedUser);
        
        // Verificar token con el servidor en background (opcional)
        // Esto no bloquea el login, solo verifica en segundo plano
        authService.verifyToken().then(isValid => {
          if (!isValid) {
            console.log('⚠️ Token inválido en servidor - cerrando sesión');
            logout();
          } else {
            console.log('✅ Token válido en servidor');
          }
        }).catch(err => {
          // Si falla la verificación por red, no hacemos nada
          // El usuario puede seguir usando la app con el caché
          console.log('⚠️ No se pudo verificar token con servidor (posible falta de conexión)');
        });
      } else {
        // Si no hay usuario en caché, intentar obtenerlo del servidor
        console.log('🌐 Obteniendo usuario del servidor...');
        const result = await authService.getCurrentUser();
        if (result.success && result.user) {
          console.log('✅ Usuario obtenido del servidor:', result.user.name);
          setUser(result.user);
        } else {
          console.log('❌ No se pudo obtener usuario - cerrando sesión');
          await authService.logout();
          setUser(null);
        }
      }
    } catch (error) {
      console.error('❌ Error verificando autenticación:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const result = await authService.login(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        console.log('✅ Login exitoso - sesión guardada en caché (válida por 30 días)');
        return { success: true };
      }
      
      return { success: false, error: result.error || 'Error al iniciar sesión' };
    } catch (error) {
      console.error('❌ Error en login:', error);
      return { success: false, error: 'Error inesperado al iniciar sesión' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const result = await authService.register(name, email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true };
      }
      
      return { success: false, error: result.error || 'Error al registrar usuario' };
    } catch (error) {
      console.error('Register error in context:', error);
      return { success: false, error: 'Error inesperado al registrar' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      await authService.logout();
      setUser(null);
      console.log('👋 Sesión cerrada y caché limpiado');
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const result = await authService.getCurrentUser();
      if (result.success && result.user) {
        setUser(result.user);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
