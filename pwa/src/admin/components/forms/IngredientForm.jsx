import { useState, useEffect } from 'react';
import TranslationFields from '../TranslationFields';
import Toast from '../Toast';
import { MEASUREMENT_UNITS } from '../../utils/constants';

const IngredientForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    unit: '',
    harvest_start_month: '',
    harvest_start_day: '',
    harvest_end_month: '',
    harvest_end_day: '',
    banner_image: null,
    translations: [{ language_code: 'es-MX', name: '', description: '' }]
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        unit: initialData.unit || '',
        harvest_start_month: initialData.harvest_start_month || '',
        harvest_start_day: initialData.harvest_start_day || '',
        harvest_end_month: initialData.harvest_end_month || '',
        harvest_end_day: initialData.harvest_end_day || '',
        banner_image: null,
        translations: initialData.translations || [{ language_code: 'es-MX', name: '', description: '' }]
      });
      // Set existing image preview if available
      if (initialData.banner_image) {
        setImagePreview(initialData.banner_image);
      }
    }
  }, [initialData]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showToast('Por favor selecciona una imagen válida', 'error');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast('La imagen no debe superar los 5MB', 'error');
        return;
      }

      setFormData({ ...formData, banner_image: file });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, banner_image: null });
    setImagePreview(null);
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
      showToast('Error al guardar el ingrediente', 'error');
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

        {/* Banner Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Imagen Banner
          </label>
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isSubmitting}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="mt-1">
              <label className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-orange-600 hover:text-orange-500">
                      Selecciona una imagen
                    </span> o arrastra aquí
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Unidad de medida
          </label>
          <select
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Seleccionar unidad...</option>
            {MEASUREMENT_UNITS.map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        {/* Harvest Dates */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Inicio de Cosecha
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <select
                  value={formData.harvest_start_month}
                  onChange={(e) => setFormData({ ...formData, harvest_start_month: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Mes...</option>
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5">Mayo</option>
                  <option value="6">Junio</option>
                  <option value="7">Julio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="31"
                  placeholder="Día"
                  value={formData.harvest_start_day}
                  onChange={(e) => setFormData({ ...formData, harvest_start_day: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Fecha de inicio de la temporada de cosecha</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fin de Cosecha
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <select
                  value={formData.harvest_end_month}
                  onChange={(e) => setFormData({ ...formData, harvest_end_month: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Mes...</option>
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5">Mayo</option>
                  <option value="6">Junio</option>
                  <option value="7">Julio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="31"
                  placeholder="Día"
                  value={formData.harvest_end_day}
                  onChange={(e) => setFormData({ ...formData, harvest_end_day: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Fecha de fin de la temporada de cosecha</p>
          </div>
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

export default IngredientForm;