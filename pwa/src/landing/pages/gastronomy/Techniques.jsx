import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import GastronomyHeader from '../../components/GastronomyHeader';
import GastronomyFilters from '../../components/GastronomyFilters';
import GastronomyCard from '../../components/GastronomyCard';
import Loading from '../../../common/components/Loading';
import { useTechniques } from '../../hooks/useTechniques';

const Techniques = () => {
  const { getTranslations, currentLanguage } = useLanguageStore();
  const t = getTranslations();

  const { techniques, loading, error, fetchTechniques } = useTechniques();

  const [searchQuery, setSearchQuery] = useState('');

  // ==============================
  // Fetch techniques from API
  // ==============================
  useEffect(() => {
    const language = currentLanguage || 'es-MX';
    fetchTechniques(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  // ==============================
  // Filters
  // ==============================
  const filteredTechniques = techniques.filter(technique => {
    const translation = technique.translations?.[0] || {};
    const matchesSearch =
      translation.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // ==============================
  // Render
  // ==============================
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-indigo-50 to-white">
      <GastronomyHeader
        Icon={BookOpen}
        title={t.gastronomyPage?.techniques?.title || 'Técnicas Culinarias'}
        subtitle={t.gastronomyPage?.techniques?.subtitle || 'Descubre técnicas tradicionales'}
        gradientFrom="from-purple-600"
        gradientTo="to-indigo-600"
      />

      <GastronomyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.gastronomyPage?.techniques?.search || 'Buscar técnicas...'}
        showFilters={false}
        primaryColor="purple"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!loading && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredTechniques.length} {filteredTechniques.length === 1 ? 'técnica encontrada' : 'técnicas encontradas'}
            </h2>
          </div>
        )}

        {loading ? (
          <Loading variant="grid" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTechniques.map((technique) => {
            const translation = technique.translations?.[0] || {};
            return (
              <GastronomyCard
                key={technique.id}
                id={technique.id}
                image={technique.banner_image}
                title={translation.name || 'Sin nombre'}
                description={translation.description || 'Sin descripción'}
                buttonText={t.gastronomyPage?.techniques?.seeMore || 'Ver detalles'}
                detailPath={`/gastronomia/tecnicas/${technique.id}`}
                gradientColor="purple"
              />
            );
          })}
          </div>
        )}

        {!loading && filteredTechniques.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.gastronomyPage?.techniques?.noTechniquesFound || 'No se encontraron técnicas'}
            </h3>
            <p className="text-gray-600">{t.gastronomyPage?.techniques?.tryOtherTerms || 'Intenta con otros términos'}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Techniques;
