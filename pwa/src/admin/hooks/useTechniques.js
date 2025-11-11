import { useState } from 'react';
import { gastronomyAPI } from '../../common/api';

export const useTechniques = () => {
  const [techniques, setTechniques] = useState([]);
  const [technique, setTechnique] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTechniques = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.techniques.getAll(params);
      setTechniques(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchTechniqueById = async (id, language = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.techniques.getById(id, language);
      setTechnique(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const createTechnique = async (techniqueData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.techniques.create(techniqueData);
      await fetchTechniques(); // Refresh list
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateTechnique = async (id, techniqueData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.techniques.update(id, techniqueData);
      await fetchTechniques(); // Refresh list
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTechnique = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await gastronomyAPI.techniques.delete(id);
      await fetchTechniques(); // Refresh list
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    techniques,
    technique,
    loading,
    error,
    fetchTechniques,
    fetchTechniqueById,
    createTechnique,
    updateTechnique,
    deleteTechnique
  };
};