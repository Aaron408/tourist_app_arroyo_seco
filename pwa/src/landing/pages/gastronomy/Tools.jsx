import { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import GastronomyHeader from '../../components/GastronomyHeader';
import GastronomyFilters from '../../components/GastronomyFilters';
import GastronomyCard from '../../components/GastronomyCard';
import Loading from '../../../common/components/Loading';
import { useTools } from '../../hooks/useTools';

const Tools = () => {
  const { getTranslations, currentLanguage } = useLanguageStore();
  const t = getTranslations();

  const { tools, loading, error, fetchTools } = useTools();

  const [searchQuery, setSearchQuery] = useState('');

  // ==============================
  // Fetch tools from API
  // ==============================
  useEffect(() => {
    const language = currentLanguage || 'es-MX';
    fetchTools(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  // ==============================
  // Filters
  // ==============================
  const filteredTools = tools.filter(tool => {
    const translation = tool.translations?.[0] || {};
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-white">
      <GastronomyHeader
        Icon={Wrench}
        title={t.gastronomyPage?.tools?.title || 'Herramientas de Cocina'}
        subtitle={t.gastronomyPage?.tools?.subtitle || 'Descubre herramientas tradicionales'}
        gradientFrom="from-amber-600"
        gradientTo="to-orange-600"
      />

      <GastronomyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.gastronomyPage?.tools?.search || 'Buscar herramientas...'}
        showFilters={false}
        primaryColor="amber"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!loading && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredTools.length} {filteredTools.length === 1 ? 'herramienta encontrada' : 'herramientas encontradas'}
            </h2>
          </div>
        )}

        {loading ? (
          <Loading variant="grid" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => {
            const translation = tool.translations?.[0] || {};
            return (
              <GastronomyCard
                key={tool.id}
                id={tool.id}
                image={tool.banner_image}
                title={translation.name || 'Sin nombre'}
                description={translation.description || 'Sin descripción'}
                buttonText={t.gastronomyPage?.tools?.seeMore || 'Ver detalles'}
                detailPath={`/gastronomia/herramientas/${tool.id}`}
                gradientColor="amber"
              />
            );
          })}
          </div>
        )}

        {!loading && filteredTools.length === 0 && (
          <div className="text-center py-20">
            <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.gastronomyPage?.tools?.noToolsFound || 'No se encontraron herramientas'}
            </h3>
            <p className="text-gray-600">{t.gastronomyPage?.tools?.tryOtherTerms || 'Intenta con otros términos'}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Tools;
