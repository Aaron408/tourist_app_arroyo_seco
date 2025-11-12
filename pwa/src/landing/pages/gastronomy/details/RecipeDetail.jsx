import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChefHat, Clock, Flame, ArrowLeft, Users, X, Image as ImageIcon, Video, Play } from 'lucide-react';
import { useLanguageStore } from '../../../stores/languageStore';
import { useRecipes } from '../../../hooks/useRecipes';
import LinkedText from '../../../components/LinkedText';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTranslations, currentLanguage } = useLanguageStore();
  const t = getTranslations();

  const { recipe, loading, error, fetchRecipeById } = useRecipes();
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const language = currentLanguage || 'es-MX';
    fetchRecipeById(id, language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentLanguage]);

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      1: 'Fácil',
      2: 'Media',
      3: 'Difícil',
    };
    return labels[difficulty] || 'Media';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      1: 'bg-green-100 text-green-700',
      2: 'bg-yellow-100 text-yellow-700',
      3: 'bg-red-100 text-red-700',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando receta...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Receta no encontrada</h3>
          <button
            onClick={() => navigate('/gastronomia/recetas')}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Volver a recetas
          </button>
        </div>
      </div>
    );
  }

  const translation = recipe.translations?.[0] || {};
  const displayImage = recipe.banner_image || 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1200&q=80';

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={displayImage}
          alt={translation.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/gastronomia/recetas')}
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">{translation.name || 'Sin nombre'}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                <Flame className="w-4 h-4 inline mr-1" />
                {getDifficultyLabel(recipe.difficulty)}
              </span>
              {recipe.duration && (
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-900">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {recipe.duration} minutos
                </span>
              )}
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

            {/* Multimedia Gallery */}
            {recipe.multimedia && recipe.multimedia.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Galería</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {recipe.multimedia.map((media, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedMedia(media)}
                    >
                      {media.type === 'image' ? (
                        <img
                          src={media.url}
                          alt={`${translation.name} - imagen ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&q=80';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                          <Play className="w-12 h-12 text-white opacity-70 z-10" />
                          <div className="absolute inset-0 bg-black opacity-40"></div>
                          <Video className="w-16 h-16 text-white opacity-30 absolute" />
                        </div>
                      )}
                      {/* Type badge */}
                      <div className="absolute top-2 right-2">
                        {media.type === 'image' ? (
                          <div className="bg-blue-500 bg-opacity-90 text-white p-1.5 rounded-full">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="bg-purple-500 bg-opacity-90 text-white p-1.5 rounded-full">
                            <Video className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps */}
            {recipe.steps && recipe.steps.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pasos de Preparación</h2>
                <div className="space-y-6">
                  {recipe.steps.sort((a, b) => a.step_number - b.step_number).map((step) => {
                    // Find translation matching current language, fallback to first translation
                    const stepTranslation = step.translations?.find(
                      t => t.language_code === currentLanguage
                    ) || step.translations?.[0] || {};

                    return (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold">
                            {step.step_number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">
                            <LinkedText text={stepTranslation.description || 'Sin descripción'} />
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Additional Info */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Información Adicional</h3>
              <div className="space-y-3">
                {recipe.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Tiempo: {recipe.duration} minutos</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  <span>Dificultad: {getDifficultyLabel(recipe.difficulty)}</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredientes</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient) => {
                    const ingredientTranslation = ingredient.translations?.[0] || {};
                    const quantity = ingredient.RecipeIngredient?.quantity || '';
                    return (
                      <li key={ingredient.id} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span className="text-gray-700">
                          <span className="font-semibold">{quantity}</span> {ingredientTranslation.name || 'Sin nombre'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media Lightbox */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.url}
                alt="Multimedia fullscreen"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1200&q=80';
                }}
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
