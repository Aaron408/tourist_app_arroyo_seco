import { useState, useEffect } from 'react';
import { ChefHat, Clock, Users, Flame, Heart } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import Header from './components/Header';
import Filters from './components/Filters';
import { gastronomyAPI } from '../../../common/api';

const Recipes = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const difficulties = ['easy', 'medium', 'hard'];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'easy': 'bg-green-100 text-green-700',
      'medium': 'bg-yellow-100 text-yellow-700',
      'hard': 'bg-red-100 text-red-700',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  // ==============================
  // Fetch recipes from API
  // ==============================
  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const language = t.languageCode || 'es';
      const response = await gastronomyAPI.recipes.getAll({ language });
      
      const formattedRecipes = response.data.map(recipe => {
        const translation = recipe.translations?.[0] || {};
        return {
          id: recipe.id,
          name: translation.name || 'No name',
          description: translation.description || '',
          image: recipe.multimedia?.[0]?.url || 'https://images.unsplash.com/photo-1599974168528-80ddb8c13f90?w=800&q=80',
          difficulty: recipe.difficulty || 'medium',
          time: recipe.duration ? `${recipe.duration} min` : 'N/A',
          servings: recipe.servings || 4,
          category: translation.category || 'General',
          isFavorite: recipe.isFavorite || false,
        };
      });

      setRecipes(formattedRecipes);
    } catch (err) {
      console.error(err);
      setError(t.gastronomyPage.recipes.fetchError || 'Error fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [t.languageCode]);

  // ==============================
  // Filters
  // ==============================
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const difficultyLabels = {
    easy: t.gastronomyPage.recipes.difficulty.easy,
    medium: t.gastronomyPage.recipes.difficulty.medium,
    hard: t.gastronomyPage.recipes.difficulty.hard,
  };

  // ==============================
  // Render
  // ==============================
  if (loading) return <div className="text-center py-20">{t.gastronomyPage.recipes.loading || 'Loading...'}</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white">
      <Header
        Icon={ChefHat}
        title={t.gastronomyPage.recipes.title}
        subtitle={t.gastronomyPage.recipes.subtitle}
        gradientFrom="from-orange-600"
        gradientTo="to-red-600"
      />

      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.gastronomyPage.recipes.search}
        selectedFilter={selectedDifficulty}
        setSelectedFilter={setSelectedDifficulty}
        filters={difficulties}
        filterLabels={difficultyLabels}
        allLabel={t.gastronomyPage.recipes.all}
        primaryColor="orange"
      />

      {/* Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? t.gastronomyPage.recipes.recipeFound : t.gastronomyPage.recipes.recipesFound} {t.gastronomyPage.recipes.found}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Favorite Badge */}
                {recipe.isFavorite && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-gray-900">{recipe.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {recipe.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {recipe.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} pers.</span>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                    <Flame className="w-3 h-3 inline mr-1" />
                    {t.gastronomyPage.recipes.difficulty[recipe.difficulty]}
                  </span>
                  <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                    {t.gastronomyPage.recipes.seeRecipe} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gastronomyPage.recipes.noRecipesFound}</h3>
            <p className="text-gray-600">{t.gastronomyPage.recipes.tryOtherTerms}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Recipes;