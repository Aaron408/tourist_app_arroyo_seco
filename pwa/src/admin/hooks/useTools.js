import { useState } from 'react';
import { gastronomyAPI } from '../../common/api';

export const useTools = () => {
  const [tools, setTools] = useState([]);
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTools = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.tools.getAll(params);
      setTools(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchToolById = async (id, language = null) => {
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

  const createTool = async (toolData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.tools.create(toolData);
      await fetchTools(); // Refresh list
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateTool = async (id, toolData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.tools.update(id, toolData);
      await fetchTools(); // Refresh list
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTool = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await gastronomyAPI.tools.delete(id);
      await fetchTools(); // Refresh list
      return { success: true };
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
    fetchToolById,
    createTool,
    updateTool,
    deleteTool
  };
};