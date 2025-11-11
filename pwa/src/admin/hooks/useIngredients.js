import { useState } from 'react';
import { gastronomyAPI } from '../../common/api';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIngredients = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.ingredients.getAll(params);
      setIngredients(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredientById = async (id, language = null) => {
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

  const createIngredient = async (ingredientData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.ingredients.create(ingredientData);
      await fetchIngredients(); // Refresh list
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateIngredient = async (id, ingredientData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.ingredients.update(id, ingredientData);
      await fetchIngredients(); // Refresh list
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteIngredient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await gastronomyAPI.ingredients.delete(id);
      await fetchIngredients(); // Refresh list
      return { success: true };
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
    fetchIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
  };
};