import { useState } from 'react';
import { gastronomyAPI } from '../../common/api';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIngredients = async (language = 'es-MX') => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.ingredients.getAll({ language });
      setIngredients(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredientById = async (id, language = 'es-MX') => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.ingredients.getById(id, language);
      setIngredient(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    ingredients,
    ingredient,
    loading,
    error,
    fetchIngredients,
    fetchIngredientById
  };
};
