import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { authAPI } from '../../common/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check session on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('authUser');
        const storedToken = localStorage.getItem('authToken');
        
        if (storedUser && storedToken) {
          // Solo restaurar el usuario sin validar con el servidor
          // La validación ocurrirá cuando se haga la primera petición
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.login({ email, password });

      if (response.success && response.data) {
        const { user, token } = response.data;

        // Save to localStorage
        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        
        setUser(user);
        return { success: true, user };
      } else {
        throw new Error(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Error al conectar con el servidor';
      
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};