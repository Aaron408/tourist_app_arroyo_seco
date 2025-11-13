import { useState, useEffect, useRef } from 'react';
import TranslationFields from '../TranslationFields';
import Toast from '../Toast';
import { LANGUAGES } from '../../utils/constants';
import { Globe, Plus, Trash2, Search, X, Lightbulb, Wrench, Image as ImageIcon, Video, Upload } from 'lucide-react';
import { useIngredients } from '../../hooks/useIngredients';
import { useTechniques } from '../../hooks/useTechniques';
import { useTools } from '../../hooks/useTools';

const RecipeForm = ({ initialData = null, onSubmit, onCancel, renderButtons }) => {
  const { ingredients: availableIngredients, fetchIngredients } = useIngredients();
  const { techniques: availableTechniques, fetchTechniques } = useTechniques();
  const { tools: availableTools, fetchTools } = useTools();

  const [formData, setFormData] = useState({
    duration: '',
    difficulty: 1,
    banner_image: null,
    translations: [{ language_code: 'es-MX', name: '', description: '' }],
    steps: [
      {
        step_number: 1,
        translations: [{ language_code: 'es-MX', description: '' }]
      }
    ],
    ingredients: [],
    multimedia: [] // Array of { type: 'image'|'video', file: File, preview: string, existingUrl: string }
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);

  // For inserting techniques/tools in step descriptions
  const [showTechniqueToolModal, setShowTechniqueToolModal] = useState(null); // { stepIndex, langCode, type: 'tecnica'|'herramienta' }
  const textareaRefs = useRef({});

  useEffect(() => {
    // Fetch available ingredients, techniques, and tools on mount
    fetchIngredients({ language: 'es-MX' });
    fetchTechniques('es-MX');
    fetchTools('es-MX');
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.ingredient-search-container')) {
        setShowIngredientDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (initialData) {
      // Map ingredients to the format expected by the form
      const mappedIngredients = initialData.ingredients?.map(ing => ({
        ingredient_id: ing.id,
        quantity: ing.RecipeIngredient?.quantity || ''
      })) || [];

      // Map existing multimedia (URLs from backend)
      const mappedMultimedia = initialData.multimedia?.map(media => ({
        type: media.type,
        existingUrl: media.url,
        file: null,
        preview: media.url
      })) || [];

      setFormData({
        duration: initialData.duration || '',
        difficulty: initialData.difficulty || 1,
        banner_image: null,
        translations: initialData.translations || [{ language_code: 'es-MX', name: '', description: '' }],
        steps: initialData.steps || [
          {
            step_number: 1,
            translations: [{ language_code: 'es-MX', description: '' }]
          }
        ],
        ingredients: mappedIngredients,
        multimedia: mappedMultimedia
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

  const addStep = () => {
    const newStepNumber = formData.steps.length + 1;
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        {
          step_number: newStepNumber,
          translations: [{ language_code: 'es-MX', description: '' }]
        }
      ]
    });
  };

  const removeStep = (index) => {
    if (formData.steps.length <= 1) {
      showToast('Debe haber al menos un paso', 'error');
      return;
    }
    const newSteps = formData.steps.filter((_, i) => i !== index);
    // Renumber steps
    newSteps.forEach((step, i) => {
      step.step_number = i + 1;
    });
    setFormData({ ...formData, steps: newSteps });
  };

  const updateStepTranslation = (stepIndex, langCode, description) => {
    const newSteps = [...formData.steps];
    const translationIndex = newSteps[stepIndex].translations.findIndex(
      t => t.language_code === langCode
    );

    if (translationIndex >= 0) {
      newSteps[stepIndex].translations[translationIndex].description = description;
    }
    setFormData({ ...formData, steps: newSteps });
  };

  const addStepLanguage = (stepIndex, langCode) => {
    const newSteps = [...formData.steps];
    const hasLanguage = newSteps[stepIndex].translations.some(
      t => t.language_code === langCode
    );

    if (!hasLanguage) {
      newSteps[stepIndex].translations.push({
        language_code: langCode,
        description: ''
      });
      setFormData({ ...formData, steps: newSteps });
    }
  };

  const removeStepLanguage = (stepIndex, langCode) => {
    const newSteps = [...formData.steps];
    if (newSteps[stepIndex].translations.length <= 1) {
      showToast('Debe haber al menos un idioma por paso', 'error');
      return;
    }
    newSteps[stepIndex].translations = newSteps[stepIndex].translations.filter(
      t => t.language_code !== langCode
    );
    setFormData({ ...formData, steps: newSteps });
  };

  // ============================================================================
  // Ingredient handlers
  // ============================================================================
  const addIngredient = (ingredientId) => {
    // Check if ingredient already exists
    if (formData.ingredients.some(ing => ing.ingredient_id === ingredientId)) {
      showToast('Este ingrediente ya está agregado', 'error');
      return;
    }

    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { ingredient_id: ingredientId, quantity: '' }
      ]
    });
    setIngredientSearch('');
    setShowIngredientDropdown(false);
  };

  const removeIngredient = (ingredientId) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.ingredient_id !== ingredientId)
    });
  };

  const updateIngredientQuantity = (ingredientId, quantity) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.map(ing =>
        ing.ingredient_id === ingredientId ? { ...ing, quantity } : ing
      )
    });
  };

  const filteredAvailableIngredients = availableIngredients.filter(ing => {
    const translation = ing.translations?.[0];
    const matchesSearch = translation?.name?.toLowerCase().includes(ingredientSearch.toLowerCase());
    const notAdded = !formData.ingredients.some(formIng => formIng.ingredient_id === ing.id);
    return matchesSearch && notAdded;
  });

  // ============================================================================
  // Multimedia handlers
  // ============================================================================
  const handleMultimediaChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const newMultimedia = [];

    files.forEach(file => {
      // Validate file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (!isImage && !isVideo) {
        showToast(`Archivo ${file.name} no es válido. Solo imágenes y videos`, 'error');
        return;
      }

      // Validate file size (max 10MB for images, 50MB for videos)
      const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        showToast(`${file.name} excede el tamaño máximo (${isVideo ? '50MB' : '10MB'})`, 'error');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        newMultimedia.push({
          type: isImage ? 'image' : 'video',
          file: file,
          preview: reader.result,
          existingUrl: null
        });

        // Update state after all files are processed
        if (newMultimedia.length === files.filter(f => f.type.startsWith('image/') || f.type.startsWith('video/')).length) {
          setFormData(prev => ({
            ...prev,
            multimedia: [...prev.multimedia, ...newMultimedia]
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const removeMultimedia = (index) => {
    setFormData(prev => ({
      ...prev,
      multimedia: prev.multimedia.filter((_, i) => i !== index)
    }));
  };

  // ============================================================================
  // Technique/Tool insertion handlers
  // ============================================================================
  const insertTechniqueOrTool = (item, type) => {
    if (!showTechniqueToolModal) return;

    const { stepIndex, langCode } = showTechniqueToolModal;
    const translation = item.translations?.[0];
    const name = translation?.name || 'Sin nombre';

    // Create the special code: [tecnica:ID:nombre] or [herramienta:ID:nombre]
    const code = `[${type}:${item.id}:${name}]`;

    // Get the textarea ref key
    const refKey = `${stepIndex}-${langCode}`;
    const textarea = textareaRefs.current[refKey];

    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentDescription = formData.steps[stepIndex].translations.find(
        t => t.language_code === langCode
      )?.description || '';

      // Insert the code at cursor position
      const newDescription =
        currentDescription.substring(0, start) +
        code +
        currentDescription.substring(end);

      updateStepTranslation(stepIndex, langCode, newDescription);

      // Set cursor position after the inserted code
      setTimeout(() => {
        textarea.focus();
        const newPosition = start + code.length;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    }

    setShowTechniqueToolModal(null);
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

    if (formData.steps.length === 0) {
      showToast('Debes agregar al menos un paso', 'error');
      return;
    }

    const hasValidStep = formData.steps.some(s => s.translations[0]?.description?.trim());
    if (!hasValidStep) {
      showToast('Al menos un paso debe tener descripción', 'error');
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
      
      <form id="recipe-form" onSubmit={handleSubmit} className="space-y-6">
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

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ingredientes
          </label>

          {/* Search and add ingredients */}
          <div className="relative mb-4 ingredient-search-container">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={ingredientSearch}
                onChange={(e) => {
                  setIngredientSearch(e.target.value);
                  setShowIngredientDropdown(true);
                }}
                onFocus={() => setShowIngredientDropdown(true)}
                placeholder="Buscar ingrediente para agregar..."
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Dropdown */}
            {showIngredientDropdown && ingredientSearch && filteredAvailableIngredients.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredAvailableIngredients.map((ingredient) => {
                  const translation = ingredient.translations?.[0];
                  return (
                    <button
                      key={ingredient.id}
                      type="button"
                      onClick={() => addIngredient(ingredient.id)}
                      className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                    >
                      <Plus className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-900">{translation?.name || 'Sin nombre'}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected ingredients list */}
          {formData.ingredients.length > 0 ? (
            <div className="space-y-2 border border-gray-200 rounded-lg p-4 bg-gray-50">
              {formData.ingredients.map((formIngredient) => {
                const ingredient = availableIngredients.find(ing => ing.id === formIngredient.ingredient_id);
                const translation = ingredient?.translations?.[0];

                return (
                  <div key={formIngredient.ingredient_id} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{translation?.name || 'Sin nombre'}</span>
                    </div>
                    <input
                      type="text"
                      value={formIngredient.quantity}
                      onChange={(e) => updateIngredientQuantity(formIngredient.ingredient_id, e.target.value)}
                      placeholder="Cantidad (ej: 200g, 2 tazas)"
                      disabled={isSubmitting}
                      className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeIngredient(formIngredient.ingredient_id)}
                      disabled={isSubmitting}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm">No hay ingredientes agregados</p>
              <p className="text-gray-400 text-xs mt-1">Usa el buscador de arriba para agregar ingredientes</p>
            </div>
          )}
        </div>

        {/* Multimedia */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Multimedia (Imágenes y Videos)
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Agrega imágenes y videos adicionales de la receta. Máximo 10MB por imagen, 50MB por video.
          </p>

          {/* Upload button */}
          <div className="mb-4">
            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Seleccionar archivos multimedia
              </span>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMultimediaChange}
                disabled={isSubmitting}
                className="hidden"
              />
            </label>
          </div>

          {/* Multimedia grid */}
          {formData.multimedia.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              {formData.multimedia.map((media, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 border-2 border-gray-300">
                    {media.type === 'image' ? (
                      <img
                        src={media.preview}
                        alt={`Multimedia ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <Video className="w-12 h-12 text-white opacity-70" />
                        <div className="absolute inset-0 flex items-end p-2">
                          <span className="text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded">
                            {media.file?.name || 'Video'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Type badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${
                      media.type === 'image'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {media.type === 'image' ? (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          Imagen
                        </>
                      ) : (
                        <>
                          <Video className="w-3 h-3" />
                          Video
                        </>
                      )}
                    </span>
                  </div>
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeMultimedia(index)}
                    disabled={isSubmitting}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <div className="flex justify-center gap-4 mb-2">
                <ImageIcon className="w-8 h-8 text-gray-300" />
                <Video className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm">No hay multimedia agregada</p>
              <p className="text-gray-400 text-xs mt-1">Usa el botón de arriba para agregar imágenes o videos</p>
            </div>
          )}
        </div>

        {/* Steps */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Pasos de la receta
            </label>
            <button
              type="button"
              onClick={addStep}
              disabled={isSubmitting}
              className="text-sm px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              + Agregar paso
            </button>
          </div>
          <div className="space-y-4">
            {formData.steps.map((step, stepIndex) => {
              const selectedLanguages = step.translations.map(t => t.language_code);
              const availableLanguages = LANGUAGES.filter(
                lang => !selectedLanguages.includes(lang.code)
              );

              return (
                <div key={stepIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-semibold text-sm">
                        {stepIndex + 1}
                      </div>
                      <span className="font-medium text-gray-700">Paso {stepIndex + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {availableLanguages.length > 0 && (
                        <div className="relative group">
                          <button
                            type="button"
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                            disabled={isSubmitting}
                          >
                            <Plus className="w-3 h-3" />
                            <span>Idioma</span>
                          </button>
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            {availableLanguages.map(lang => (
                              <button
                                key={lang.code}
                                type="button"
                                onClick={() => addStepLanguage(stepIndex, lang.code)}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-orange-50 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center gap-2"
                              >
                                <span className="text-lg">{lang.flag}</span>
                                <span>{lang.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {formData.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(stepIndex)}
                          disabled={isSubmitting}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {step.translations.map((translation, transIndex) => {
                      const lang = LANGUAGES.find(l => l.code === translation.language_code);
                      return (
                        <div key={translation.language_code} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{lang?.flag}</span>
                              <span className="text-sm font-medium text-gray-700">{lang?.name}</span>
                            </div>
                            {step.translations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeStepLanguage(stepIndex, translation.language_code)}
                                disabled={isSubmitting}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <textarea
                            ref={(el) => {
                              const refKey = `${stepIndex}-${translation.language_code}`;
                              textareaRefs.current[refKey] = el;
                            }}
                            value={translation.description || ''}
                            onChange={(e) => updateStepTranslation(stepIndex, translation.language_code, e.target.value)}
                            disabled={isSubmitting}
                            placeholder={`Describe el paso ${stepIndex + 1} en ${lang?.name}...`}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none text-sm"
                          />
                          {/* Insert Technique/Tool buttons */}
                          <div className="flex gap-2 mt-2">
                            <button
                              type="button"
                              onClick={() => setShowTechniqueToolModal({ stepIndex, langCode: translation.language_code, type: 'tecnica' })}
                              disabled={isSubmitting}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors disabled:opacity-50"
                            >
                              <Lightbulb className="w-3 h-3" />
                              <span>Insertar técnica</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowTechniqueToolModal({ stepIndex, langCode: translation.language_code, type: 'herramienta' })}
                              disabled={isSubmitting}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                            >
                              <Wrench className="w-3 h-3" />
                              <span>Insertar herramienta</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Render buttons if provided (for modal footer) */}
        {renderButtons && renderButtons({
          onCancel,
          isSubmitting,
          initialData
        })}
      </form>

      {/* Modal for selecting technique or tool */}
      {showTechniqueToolModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center gap-2">
                {showTechniqueToolModal.type === 'tecnica' ? (
                  <>
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Seleccionar Técnica</h3>
                  </>
                ) : (
                  <>
                    <Wrench className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Seleccionar Herramienta</h3>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowTechniqueToolModal(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-3">
                {showTechniqueToolModal.type === 'tecnica' ? (
                  availableTechniques.length > 0 ? (
                    availableTechniques.map((technique) => {
                      const translation = technique.translations?.[0];
                      return (
                        <button
                          key={technique.id}
                          type="button"
                          onClick={() => insertTechniqueOrTool(technique, 'tecnica')}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                        >
                          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{translation?.name || 'Sin nombre'}</div>
                            {translation?.description && (
                              <div className="text-sm text-gray-600 line-clamp-2">{translation.description}</div>
                            )}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No hay técnicas disponibles
                    </div>
                  )
                ) : (
                  availableTools.length > 0 ? (
                    availableTools.map((tool) => {
                      const translation = tool.translations?.[0];
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => insertTechniqueOrTool(tool, 'herramienta')}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-left"
                        >
                          <Wrench className="w-5 h-5 text-purple-600 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{translation?.name || 'Sin nombre'}</div>
                            {translation?.description && (
                              <div className="text-sm text-gray-600 line-clamp-2">{translation.description}</div>
                            )}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No hay herramientas disponibles
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={() => setShowTechniqueToolModal(null)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeForm;