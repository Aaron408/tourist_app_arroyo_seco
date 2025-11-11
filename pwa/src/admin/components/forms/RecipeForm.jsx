import { useState, useEffect } from 'react';
import TranslationFields from '../TranslationFields';
import Toast from '../Toast';

const RecipeForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    duration: '',
    difficulty: 1,
    translations: [{ language_code: 'es-MX', name: '', description: '' }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        duration: initialData.duration || '',
        difficulty: initialData.difficulty || 1,
        translations: initialData.translations || [{ language_code: 'es-MX', name: '', description: '' }]
      });
    }
  }, [initialData]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;

    // Validation
    if (formData.translations.length === 0) {
      showToast('Debes agregar al menos una traducción', 'error');
      return;
    }

    const hasValidTranslation = formData.translations.some(t => t.name?.trim());
    if (!hasValidTranslation) {
      showToast('Al menos una traducción debe tener nombre', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      showToast('Error al guardar la receta', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Translations */}
        <TranslationFields
          translations={formData.translations}
          onChange={(translations) => setFormData({ ...formData, translations })}
          fields={['name', 'description']}
        />

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Duración (minutos)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="60"
            min="0"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Dificultad
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: parseInt(e.target.value) })}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value={1}>Fácil</option>
            <option value={2}>Media</option>
            <option value={3}>Difícil</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </>
            ) : (
              initialData ? 'Actualizar' : 'Crear'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;