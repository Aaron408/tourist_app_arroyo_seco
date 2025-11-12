import { useState, useEffect } from 'react';
import { Leaf, Calendar, MapPin } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import GastronomyHeader from '../../components/GastronomyHeader';
import GastronomyFilters from '../../components/GastronomyFilters';
import GastronomyCard from '../../components/GastronomyCard';
import Loading from '../../../common/components/Loading';
import { useIngredients } from '../../hooks/useIngredients';

const Ingredients = () => {
  const { getTranslations, currentLanguage } = useLanguageStore();
  const t = getTranslations();

  const { ingredients, loading, error, fetchIngredients } = useIngredients();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(null);

  const seasons = ['spring', 'summer', 'fall', 'winter', 'yearRound'];

  // ==============================
  // Fetch ingredients from API
  // ==============================
  useEffect(() => {
    const language = currentLanguage || 'es-MX';
    fetchIngredients(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  // ==============================
  // Filters
  // ==============================
  const filteredIngredients = ingredients.filter(ingredient => {
    const translation = ingredient.translations?.[0] || {};
    const matchesSearch =
      translation.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeason = !selectedSeason || ingredient.season === selectedSeason;
    return matchesSearch && matchesSeason;
  });

  const seasonLabels = {
    spring: t.gastronomyPage?.ingredients?.seasons?.spring || 'Primavera',
    summer: t.gastronomyPage?.ingredients?.seasons?.summer || 'Verano',
    fall: t.gastronomyPage?.ingredients?.seasons?.fall || 'Otoño',
    winter: t.gastronomyPage?.ingredients?.seasons?.winter || 'Invierno',
    yearRound: t.gastronomyPage?.ingredients?.seasons?.yearRound || 'Todo el año',
  };

  // ==============================
  // Render
  // ==============================
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white">
      <GastronomyHeader
        Icon={Leaf}
        title={t.gastronomyPage?.ingredients?.title || 'Ingredientes'}
        subtitle={t.gastronomyPage?.ingredients?.subtitle || 'Descubre ingredientes locales'}
        gradientFrom="from-green-600"
        gradientTo="to-emerald-600"
      />

      <GastronomyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.gastronomyPage?.ingredients?.search || 'Buscar ingredientes...'}
        showFilters={false}
        primaryColor="green"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!loading && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredIngredients.length} {filteredIngredients.length === 1 ? 'ingrediente encontrado' : 'ingredientes encontrados'}
            </h2>
          </div>
        )}

        {loading ? (
          <Loading variant="grid" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIngredients.map((ingredient) => {
            const translation = ingredient.translations?.[0] || {};
            return (
              <GastronomyCard
                key={ingredient.id}
                id={ingredient.id}
                image={ingredient.banner_image}
                title={translation.name || 'Sin nombre'}
                description={translation.description || 'Sin descripción'}
                badges={ingredient.season ? [
                  {
                    icon: Calendar,
                    text: seasonLabels[ingredient.season] || 'N/A',
                  },
                ] : []}
                meta={[
                  {
                    icon: MapPin,
                    text: ingredient.region || 'Local',
                  },
                ]}
                buttonText={t.gastronomyPage?.ingredients?.seeMoreDetails || 'Ver detalles'}
                detailPath={`/gastronomia/ingredientes/${ingredient.id}`}
                gradientColor="green"
              />
            );
          })}
          </div>
        )}

        {!loading && filteredIngredients.length === 0 && (
          <div className="text-center py-20">
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.gastronomyPage?.ingredients?.noIngredientsFound || 'No se encontraron ingredientes'}
            </h3>
            <p className="text-gray-600">{t.gastronomyPage?.ingredients?.tryOtherTerms || 'Intenta con otros términos'}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Ingredients;
