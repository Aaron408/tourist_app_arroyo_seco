import React, { useState } from 'react';
import { Search, ChefHat, Clock, Award, BookOpen, Play } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

const Techniques = () => {
  const { t } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const techniques = [
    {
      id: 1,
      name: 'Nixtamalización',
      description: 'Proceso ancestral para preparar el maíz, aumentando su valor nutricional',
      image: 'https://images.unsplash.com/photo-1628191010210-a59de33e8417?w=800&q=80',
      category: 'preparation',
      difficulty: 'advanced',
      time: '12-24 hrs',
      origin: 'Prehispánica',
      steps: 5,
      tools: ['Olla grande', 'Cal', 'Metate'],
    },
    {
      id: 2,
      name: 'Molcajete',
      description: 'Técnica tradicional para moler ingredientes y crear salsas con textura única',
      image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800&q=80',
      category: 'grinding',
      difficulty: 'medium',
      time: '15-30 min',
      origin: 'Tradicional',
      steps: 3,
      tools: ['Molcajete', 'Tejolote'],
    },
    {
      id: 3,
      name: 'Cocción en Comal',
      description: 'Método de cocción directa sobre superficie caliente para tortillas y más',
      image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800&q=80',
      category: 'cooking',
      difficulty: 'medium',
      time: '5-10 min',
      origin: 'Tradicional',
      steps: 4,
      tools: ['Comal', 'Tortillero'],
    },
    {
      id: 4,
      name: 'Horneado en Horno de Leña',
      description: 'Cocción lenta con sabor ahumado característico',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      category: 'cooking',
      difficulty: 'advanced',
      time: '2-4 hrs',
      origin: 'Colonial',
      steps: 6,
      tools: ['Horno de leña', 'Pala de madera'],
    },
    {
      id: 5,
      name: 'Fermentación Natural',
      description: 'Proceso para crear atole, pulque y otros productos fermentados',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
      category: 'fermentation',
      difficulty: 'advanced',
      time: '3-7 días',
      origin: 'Prehispánica',
      steps: 4,
      tools: ['Recipientes de barro', 'Telas'],
    },
    {
      id: 6,
      name: 'Secado al Sol',
      description: 'Preservación de chiles, hierbas y frutas usando el sol',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      category: 'preservation',
      difficulty: 'easy',
      time: '2-5 días',
      origin: 'Tradicional',
      steps: 3,
      tools: ['Petates', 'Rejillas'],
    },
  ];

  const categories = ['preparation', 'grinding', 'cooking', 'fermentation', 'preservation'];

  const getCategoryColor = (category) => {
    const colors = {
      'preparation': 'bg-blue-100 text-blue-700 border-blue-200',
      'grinding': 'bg-purple-100 text-purple-700 border-purple-200',
      'cooking': 'bg-orange-100 text-orange-700 border-orange-200',
      'fermentation': 'bg-green-100 text-green-700 border-green-200',
      'preservation': 'bg-amber-100 text-amber-700 border-amber-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'easy': 'bg-green-500',
      'medium': 'bg-yellow-500',
      'advanced': 'bg-red-500',
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  const getDifficultyLevel = (difficulty) => {
    const levels = {
      'easy': 1,
      'medium': 2,
      'advanced': 3,
    };
    return levels[difficulty] || 1;
  };

  const filteredTechniques = techniques.filter(technique => {
    const matchesSearch = technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         technique.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || technique.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <ChefHat className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4">{t('gastronomy.techniquesTitle')}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t('gastronomy.techniquesSubtitle')}
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
                placeholder={t('gastronomy.searchTechniques')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedCategory === null
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('gastronomy.allTechniques')}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`gastronomy.categories.${category}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Techniques Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredTechniques.length} {filteredTechniques.length === 1 ? t('gastronomy.techniqueFound') : t('gastronomy.techniquesFound')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTechniques.map((technique) => (
            <div
              key={technique.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getCategoryColor(technique.category)}`}>
                    {t(`gastronomy.categories.${technique.category}`)}
                  </span>
                </div>

                {/* Difficulty Indicator */}
                <div className="absolute top-4 right-4 flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-8 rounded-full ${
                        level <= getDifficultyLevel(technique.difficulty)
                          ? getDifficultyColor(technique.difficulty)
                          : 'bg-white/30'
                      }`}
                    ></div>
                  ))}
                </div>

                {/* Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {technique.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">{technique.origin}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {technique.description}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-gray-500 text-xs">{t('gastronomy.time')}</p>
                      <p className="font-semibold text-gray-900">{technique.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-gray-500 text-xs">{t('gastronomy.steps')}</p>
                      <p className="font-semibold text-gray-900">{technique.steps} {t('gastronomy.steps')}</p>
                    </div>
                  </div>
                </div>

                {/* Tools */}
                <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs font-semibold text-purple-900 uppercase mb-2 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {t('gastronomy.toolsNeeded')}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {technique.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white text-purple-700 rounded text-xs font-medium border border-purple-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  {t('gastronomy.seeTutorial')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTechniques.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('gastronomy.noTechniquesFound')}</h3>
            <p className="text-gray-600">{t('gastronomy.tryOtherTerms')}</p>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('gastronomy.learnFromMasters')}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('gastronomy.learnFromMastersDesc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500 text-white rounded-full p-1 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">{t('gastronomy.videoTutorials')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500 text-white rounded-full p-1 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">{t('gastronomy.expertTips')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500 text-white rounded-full p-1 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">{t('gastronomy.culturalContext')}</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                  alt="Traditional cooking"
                  className="relative rounded-2xl shadow-2xl object-cover w-full h-[300px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Techniques;