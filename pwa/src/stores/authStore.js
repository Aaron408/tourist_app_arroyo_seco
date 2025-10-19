import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const mockResponse = { id: 1, name: 'Usuario Ejemplo', email: credentials.email };
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ 
        user: mockResponse, 
        isAuthenticated: true,
        isLoading: false 
      });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.message || 'Error en el inicio de sesión', 
        isLoading: false 
      });
      return { success: false, error: error.message };
    }
  },
  
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
  
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const mockResponse = { id: 2, ...userData };
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ 
        user: mockResponse, 
        isAuthenticated: true,
        isLoading: false 
      });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.message || 'Error en el registro', 
        isLoading: false 
      });
      return { success: false, error: error.message };
    }
  },
  
  clearError: () => set({ error: null }),
}));