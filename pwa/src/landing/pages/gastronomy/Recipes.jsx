import React, { useState } from 'react';
import { Search, Clock, Users, ChefHat, Flame, Heart } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

const Recipes = () => {
  const { t } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Datos de ejemplo de recetas
  const recipes = [
    {
      id: 1,
      name: 'Enchiladas Queretanas',
      description: 'Enchiladas tradicionales rellenas de queso fresco y bañadas en salsa roja',
      image: 'https://images.unsplash.com/photo-1599974168528-80ddb8c13f90?w=800&q=80',
      difficulty: 'medium',
      time: '45 min',
      servings: 4,
      category: 'Plato Principal',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Gorditas de Maíz',
      description: 'Gorditas hechas a mano con maíz local, perfectas para rellenar',
      image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80',
      difficulty: 'easy',
      time: '30 min',
      servings: 6,
      category: 'Antojitos',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Mole de Olla',
      description: 'Caldo tradicional con verduras frescas y carne de res',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
      difficulty: 'hard',
      time: '2 hrs',
      servings: 8,
      category: 'Sopas',
      isFavorite: true,
    },
    {
      id: 4,
      name: 'Atole de Elote',
      description: 'Bebida caliente tradicional hecha con elote tierno',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
      difficulty: 'easy',
      time: '20 min',
      servings: 4,
      category: 'Bebidas',
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Nopales Asados',
      description: 'Nopales frescos asados con especias tradicionales',
      image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80',
      difficulty: 'easy',
      time: '15 min',
      servings: 4,
      category: 'Guarniciones',
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Pan de Pulque',
      description: 'Pan tradicional fermentado con pulque natural',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      difficulty: 'medium',
      time: '3 hrs',
      servings: 12,
      category: 'Postres',
      isFavorite: true,
    },
  ];

  const difficulties = ['easy', 'medium', 'hard'];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'easy': 'bg-green-100 text-green-700',
      'medium': 'bg-yellow-100 text-yellow-700',
      'hard': 'bg-red-100 text-red-700',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <ChefHat className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4">{t('gastronomy.recipesTitle')}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t('gastronomy.recipesSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('gastronomy.searchRecipes')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Difficulty Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDifficulty(null)}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedDifficulty === null
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('gastronomy.allRecipes')}
              </button>
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`gastronomy.difficulty.${difficulty}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? t('gastronomy.recipeFound') : t('gastronomy.recipesFound')} {t('gastronomy.found')}
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
                    {t(`gastronomy.difficulty.${recipe.difficulty}`)}
                  </span>
                  <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                    {t('gastronomy.seeRecipe')} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('gastronomy.noRecipesFound')}</h3>
            <p className="text-gray-600">{t('gastronomy.tryOtherTerms')}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Recipes;