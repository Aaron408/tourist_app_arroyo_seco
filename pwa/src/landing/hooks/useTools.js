import { useState } from 'react';
import { gastronomyAPI } from '../../common/api';

export const useTools = () => {
  const [tools, setTools] = useState([]);
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTools = async (language = 'es-MX') => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.tools.getAll({ language });
      setTools(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchToolById = async (id, language = 'es-MX') => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.tools.getById(id, language);
      setTool(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    tools,
    tool,
    loading,
    error,
    fetchTools,
    fetchToolById
  };
};
