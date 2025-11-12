import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Leaf, ArrowLeft, Calendar, MapPin, Package, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../../../stores/languageStore';
import { useIngredients } from '../../../hooks/useIngredients';

const IngredientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();

  const { ingredient, loading, error, fetchIngredientById } = useIngredients();

  // Helper function to format month/day to readable date
  const formatHarvestDate = (month, day) => {
    if (!month || !day) return null;
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${day} de ${monthNames[parseInt(month) - 1]}`;
  };

  useEffect(() => {
    const language = t.languageCode || 'es-MX';
    fetchIngredientById(id, language);
  }, [id, t.languageCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando ingrediente...</p>
        </div>
      </div>
    );
  }

  if (error || !ingredient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ingrediente no encontrado</h3>
          <button
            onClick={() => navigate('/gastronomia/ingredientes')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Volver a ingredientes
          </button>
        </div>
      </div>
    );
  }

  const translation = ingredient.translations?.[0] || {};
  const displayImage = ingredient.banner_image || 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1200&q=80';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={displayImage}
          alt={translation.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/gastronomia/ingredientes')}
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Leaf className="w-10 h-10 text-white" />
              <h1 className="text-5xl font-bold text-white">{translation.name || 'Sin nombre'}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {translation.description && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{translation.description}</p>
              </div>
            )}

            {/* Properties */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Información del Ingrediente</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ingredient.unit && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-green-600" />
                      <h3 className="text-sm font-semibold text-green-900">Unidad de Medida</h3>
                    </div>
                    <p className="text-gray-700 font-medium">{ingredient.unit}</p>
                  </div>
                )}
                {formatHarvestDate(ingredient.harvest_start_month, ingredient.harvest_start_day) && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <h3 className="text-sm font-semibold text-green-900">Inicio de Cosecha</h3>
                    </div>
                    <p className="text-gray-700 font-medium">{formatHarvestDate(ingredient.harvest_start_month, ingredient.harvest_start_day)}</p>
                  </div>
                )}
                {formatHarvestDate(ingredient.harvest_end_month, ingredient.harvest_end_day) && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <h3 className="text-sm font-semibold text-green-900">Fin de Cosecha</h3>
                    </div>
                    <p className="text-gray-700 font-medium">{formatHarvestDate(ingredient.harvest_end_month, ingredient.harvest_end_day)}</p>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border-2 border-amber-100">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-2">Ingrediente Local</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Este ingrediente forma parte de la rica tradición gastronómica local,
                        destacando por su frescura y calidad en la preparación de platillos típicos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Información Rápida</h3>
              <div className="space-y-3">
                {ingredient.unit && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Unidad:</span>
                    <span>{ingredient.unit}</span>
                  </div>
                )}
                {(formatHarvestDate(ingredient.harvest_start_month, ingredient.harvest_start_day) ||
                  formatHarvestDate(ingredient.harvest_end_month, ingredient.harvest_end_day)) && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">Temporada:</span>
                    </div>
                    <div className="text-sm pl-7">
                      {formatHarvestDate(ingredient.harvest_start_month, ingredient.harvest_start_day) &&
                        <div>Inicio: {formatHarvestDate(ingredient.harvest_start_month, ingredient.harvest_start_day)}</div>}
                      {formatHarvestDate(ingredient.harvest_end_month, ingredient.harvest_end_day) &&
                        <div>Fin: {formatHarvestDate(ingredient.harvest_end_month, ingredient.harvest_end_day)}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Recipes */}
            {ingredient.recipes && ingredient.recipes.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recetas Relacionadas</h3>
                <div className="space-y-2">
                  {ingredient.recipes.slice(0, 5).map((recipe) => {
                    const recipeTranslation = recipe.translations?.[0] || {};
                    return (
                      <button
                        key={recipe.id}
                        onClick={() => navigate(`/gastronomia/recetas/${recipe.id}`)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 transition-colors text-gray-700 hover:text-green-700"
                      >
                        {recipeTranslation.name || 'Sin nombre'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetail;
