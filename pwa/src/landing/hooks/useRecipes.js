import { useState } from 'react';
import { gastronomyAPI } from '../../common/api';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async (language = 'es-MX') => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.recipes.getAll({ language });
      setRecipes(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeById = async (id, language = 'es-MX') => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.recipes.getById(id, language);
      setRecipe(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async (query, language = 'es-MX') => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.recipes.search(query, language);
      setRecipes(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    recipes,
    recipe,
    loading,
    error,
    fetchRecipes,
    fetchRecipeById,
    searchRecipes
  };
};
