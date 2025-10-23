import React, { useState } from 'react';
import { Search, Leaf, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

const Ingredients = () => {
  const { t } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(null);

  const ingredients = [
    {
      id: 1,
      name: 'Maíz Criollo',
      description: 'Variedad ancestral cultivada en la región desde tiempos prehispánicos',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80',
      season: 'yearRound',
      region: 'Sierra Gorda',
      uses: ['Tortillas', 'Tamales', 'Atole'],
      benefits: 'Alto en fibra y antioxidantes',
    },
    {
      id: 2,
      name: 'Nopal',
      description: 'Cactus comestible rico en fibra y nutrientes',
      image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80',
      season: 'spring',
      region: 'Arroyo Seco',
      uses: ['Ensaladas', 'Guisados', 'Asados'],
      benefits: 'Controla el azúcar en sangre',
    },
    {
      id: 3,
      name: 'Chile Serrano',
      description: 'Picante característico de la cocina mexicana',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      season: 'summer',
      region: 'Local',
      uses: ['Salsas', 'Guisados', 'Escabeches'],
      benefits: 'Rico en vitamina C',
    },
    {
      id: 4,
      name: 'Frijol Negro',
      description: 'Leguminosa básica en la alimentación tradicional',
      image: 'https://images.unsplash.com/photo-1596797882870-8c33deeacb98?w=800&q=80',
      season: 'yearRound',
      region: 'Querétaro',
      uses: ['Refritos', 'Caldos', 'Ensaladas'],
      benefits: 'Alto en proteínas',
    },
    {
      id: 5,
      name: 'Calabaza',
      description: 'Fruto versátil usado en platillos dulces y salados',
      image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=800&q=80',
      season: 'fall',
      region: 'Sierra Gorda',
      uses: ['Guisos', 'Postres', 'Sopas'],
      benefits: 'Rica en vitamina A',
    },
    {
      id: 6,
      name: 'Quelites',
      description: 'Hojas comestibles recolectadas de plantas silvestres',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80',
      season: 'spring',
      region: 'Local',
      uses: ['Quesadillas', 'Sopas', 'Guisados'],
      benefits: 'Ricos en hierro y calcio',
    },
  ];

  const seasons = ['spring', 'summer', 'fall', 'winter', 'yearRound'];

  const getSeasonColor = (season) => {
    const colors = {
      'spring': 'bg-green-100 text-green-700',
      'summer': 'bg-yellow-100 text-yellow-700',
      'fall': 'bg-orange-100 text-orange-700',
      'winter': 'bg-blue-100 text-blue-700',
      'yearRound': 'bg-purple-100 text-purple-700',
    };
    return colors[season] || 'bg-gray-100 text-gray-700';
  };

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ingredient.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeason = !selectedSeason || ingredient.season === selectedSeason;
    return matchesSearch && matchesSeason;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Leaf className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4">{t('gastronomy.ingredientsTitle')}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t('gastronomy.ingredientsSubtitle')}
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
                placeholder={t('gastronomy.searchIngredients')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Season Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedSeason(null)}
                className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedSeason === null
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('gastronomy.allIngredients')}
              </button>
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    selectedSeason === season
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`gastronomy.seasons.${season}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredIngredients.length} {filteredIngredients.length === 1 ? t('gastronomy.ingredientFound') : t('gastronomy.ingredientsFound')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Season Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeasonColor(ingredient.season)}`}>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {t(`gastronomy.seasons.${ingredient.season}`)}
                  </span>
                </div>

                {/* Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {ingredient.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  {ingredient.description}
                </p>

                {/* Region */}
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="font-medium">{ingredient.region}</span>
                </div>

                {/* Benefits */}
                <div className="flex items-start gap-2 mb-4 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">{ingredient.benefits}</p>
                </div>

                {/* Uses */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('gastronomy.commonUses')}</p>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.uses.map((use, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all">
                  {t('gastronomy.seeMoreDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
          <div className="text-center py-20">
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('gastronomy.noIngredientsFound')}</h3>
            <p className="text-gray-600">{t('gastronomy.tryOtherTerms')}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Ingredients;