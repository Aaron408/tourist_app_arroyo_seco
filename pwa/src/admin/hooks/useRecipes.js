import { useState } from 'react';
import { gastronomyAPI } from '../../common/api';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.recipes.getAll(params);
      setRecipes(response.data || response);
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeById = async (id, language = null) => {
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

  const createRecipe = async (recipeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.recipes.create(recipeData);
      await fetchRecipes(); // Refresh list
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateRecipe = async (id, recipeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gastronomyAPI.recipes.update(id, recipeData);
      await fetchRecipes(); // Refresh list
      return { success: true, data: response.data || response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await gastronomyAPI.recipes.delete(id);
      await fetchRecipes(); // Refresh list
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async (query, language = null) => {
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
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes
  };
};