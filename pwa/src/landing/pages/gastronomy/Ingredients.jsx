import { useState, useEffect } from 'react';
import { Leaf, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import Header from './components/Header';
import Filters from './components/Filters';
import { gastronomyAPI } from '../../../common/api';

const Ingredients = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();

  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(null);

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

  // ==============================
  // Fetch ingredients from API
  // ==============================
  const fetchIngredients = async () => {
    setLoading(true);
    setError(null);
    try {
      // Suponemos que quieres la traducción en el idioma actual
      const language = t.languageCode || 'es';
      const response = await gastronomyAPI.ingredients.getAll({ language });
      
      // Aquí se asume que la API devuelve las traducciones dentro de cada ingrediente
      const formattedIngredients = response.data.map(ingredient => {
        const translation = ingredient.translations?.[0] || {};
        return {
          id: ingredient.id,
          name: translation.name || 'No name',
          description: translation.description || '',
          season: ingredient.season || 'yearRound',
          region: ingredient.region || 'Local',
          uses: ingredient.uses || [],
          benefits: ingredient.benefits || '',
          image: ingredient.image || 'https://via.placeholder.com/400x300?text=Ingredient'
        };
      });

      setIngredients(formattedIngredients);
    } catch (err) {
      console.error(err);
      setError(t.gastronomyPage.ingredients.fetchError || 'Error fetching ingredients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, [t.languageCode]);

  // ==============================
  // Filters
  // ==============================
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch =
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeason = !selectedSeason || ingredient.season === selectedSeason;
    return matchesSearch && matchesSeason;
  });

  const seasonLabels = {};
  seasons.forEach(season => {
    seasonLabels[season] = t.gastronomyPage.ingredients.seasons[season];
  });

  // ==============================
  // Render
  // ==============================
  if (loading) return <div className="text-center py-20">{t.gastronomyPage.ingredients.loading || 'Loading...'}</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white">
      <Header
        Icon={Leaf}
        title={t.gastronomyPage.ingredients.title}
        subtitle={t.gastronomyPage.ingredients.subtitle}
        gradientFrom="from-green-600"
        gradientTo="to-emerald-600"
      />

      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.gastronomyPage.ingredients.search}
        selectedFilter={selectedSeason}
        setSelectedFilter={setSelectedSeason}
        filters={seasons}
        filterLabels={seasonLabels}
        allLabel={t.gastronomyPage.ingredients.all}
        primaryColor="green"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredIngredients.length} {filteredIngredients.length === 1 ? t.gastronomyPage.ingredients.ingredientFound : t.gastronomyPage.ingredients.ingredientsFound}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeasonColor(ingredient.season)}`}>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {t.gastronomyPage.ingredients.seasons[ingredient.season]}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">{ingredient.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">{ingredient.description}</p>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="font-medium">{ingredient.region}</span>
                </div>
                <div className="flex items-start gap-2 mb-4 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">{ingredient.benefits}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{t.gastronomyPage.ingredients.commonUses}</p>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.uses.map((use, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{use}</span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all">
                  {t.gastronomyPage.ingredients.seeMoreDetails}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
          <div className="text-center py-20">
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gastronomyPage.ingredients.noIngredientsFound}</h3>
            <p className="text-gray-600">{t.gastronomyPage.ingredients.tryOtherTerms}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Ingredients;
