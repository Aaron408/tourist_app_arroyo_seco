import { useState } from 'react';
import { gastronomyAPI } from '../../common/api';

export const useTechniques = () => {
  const [techniques, setTechniques] = useState([]);
  const [technique, setTechnique] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTechniques = async (language = 'es-MX') => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.techniques.getAll({ language });
      setTechniques(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchTechniqueById = async (id, language = 'es-MX') => {
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

  return {
    techniques,
    technique,
    loading,
    error,
    fetchTechniques,
    fetchTechniqueById
  };
};
