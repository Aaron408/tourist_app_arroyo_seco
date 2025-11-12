import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Wrench, ArrowLeft, Sparkles, CheckCircle, Info } from 'lucide-react';
import { useLanguageStore } from '../../../stores/languageStore';
import { useTools } from '../../../hooks/useTools';

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();

  const { tool, loading, error, fetchToolById } = useTools();

  useEffect(() => {
    const language = t.languageCode || 'es-MX';
    fetchToolById(id, language);
  }, [id, t.languageCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando herramienta...</p>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Herramienta no encontrada</h3>
          <button
            onClick={() => navigate('/gastronomia/herramientas')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Volver a herramientas
          </button>
        </div>
      </div>
    );
  }

  const translation = tool.translations?.[0] || {};
  const displayImage = tool.banner_image || 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80';

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={displayImage}
          alt={translation.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <button
          onClick={() => navigate('/gastronomia/herramientas')}
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Wrench className="w-10 h-10 text-white" />
              <h1 className="text-5xl font-bold text-white">{translation.name || 'Sin nombre'}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
                  <Wrench className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Descripción de la Herramienta</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {translation.description || 'Sin descripción disponible.'}
                </p>
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Info className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Consejos de uso y mantenimiento</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Limpia la herramienta después de cada uso para mantenerla en buen estado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Almacena en un lugar seco y seguro para prolongar su vida útil</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Utiliza la herramienta adecuada para cada tarea específica</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Call to Action */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center space-y-4">
                <Wrench className="w-12 h-12 text-amber-600 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">¿Quieres ver más?</h3>
                <p className="text-gray-600 text-sm">
                  Explora otras herramientas de cocina tradicionales
                </p>
                <button
                  onClick={() => navigate('/gastronomia/herramientas')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Ver todas las herramientas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
