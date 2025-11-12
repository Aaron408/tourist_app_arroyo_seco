import { useState, useEffect } from 'react';
import { ChefHat, Clock, Users, Flame } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import GastronomyHeader from '../../components/GastronomyHeader';
import GastronomyFilters from '../../components/GastronomyFilters';
import GastronomyCard from '../../components/GastronomyCard';
import Loading from '../../../common/components/Loading';
import { useRecipes } from '../../hooks/useRecipes';

const Recipes = () => {
  const { getTranslations, currentLanguage } = useLanguageStore();
  const t = getTranslations();

  const { recipes, loading, error, fetchRecipes } = useRecipes();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const difficulties = [1, 2, 3];

  // ==============================
  // Fetch recipes from API
  // ==============================
  useEffect(() => {
    const language = currentLanguage || 'es-MX';
    console.log('Fetching recipes with language:', language);
    fetchRecipes(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  // Debug: log recipes when they change
  useEffect(() => {
    console.log('Recipes updated:', recipes);
  }, [recipes]);

  // ==============================
  // Filters
  // ==============================
  const filteredRecipes = recipes.filter(recipe => {
    const translation = recipe.translations?.[0] || {};
    const matchesSearch =
      translation.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const difficultyLabels = {
    1: t.gastronomyPage?.recipes?.difficulty?.easy || 'Fácil',
    2: t.gastronomyPage?.recipes?.difficulty?.medium || 'Media',
    3: t.gastronomyPage?.recipes?.difficulty?.hard || 'Difícil',
  };

  // ==============================
  // Render
  // ==============================
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white">
      <GastronomyHeader
        Icon={ChefHat}
        title={t.gastronomyPage?.recipes?.title || 'Recetas'}
        subtitle={t.gastronomyPage?.recipes?.subtitle || 'Descubre recetas tradicionales'}
        gradientFrom="from-orange-600"
        gradientTo="to-red-600"
      />

      <GastronomyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.gastronomyPage?.recipes?.search || 'Buscar recetas...'}
        showFilters={false}
        primaryColor="orange"
      />

      {/* Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!loading && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? 'receta encontrada' : 'recetas encontradas'}
            </h2>
          </div>
        )}

        {loading ? (
          <Loading variant="grid" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => {
            const translation = recipe.translations?.[0] || {};
            return (
              <GastronomyCard
                key={recipe.id}
                id={recipe.id}
                image={recipe.banner_image}
                title={translation.name || 'Sin nombre'}
                description={translation.description || 'Sin descripción'}
                badges={[
                  {
                    icon: Flame,
                    text: difficultyLabels[recipe.difficulty] || 'Media',
                  },
                ]}
                meta={[
                  {
                    icon: Clock,
                    text: recipe.duration ? `${recipe.duration} min` : 'N/A',
                  },
                ]}
                buttonText={t.gastronomyPage?.recipes?.seeRecipe || 'Ver receta'}
                detailPath={`/gastronomia/recetas/${recipe.id}`}
                gradientColor="orange"
              />
            );
          })}
          </div>
        )}

        {!loading && filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.gastronomyPage?.recipes?.noRecipesFound || 'No se encontraron recetas'}
            </h3>
            <p className="text-gray-600">{t.gastronomyPage?.recipes?.tryOtherTerms || 'Intenta con otros términos'}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Recipes;