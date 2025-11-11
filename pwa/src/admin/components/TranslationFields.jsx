import { useState } from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';
import { LANGUAGES } from '../utils/constants';

const TranslationFields = ({ translations, onChange, fields = ['name', 'description'] }) => {
  const [selectedLanguages, setSelectedLanguages] = useState(
    translations.map(t => t.language_code)
  );

  const addLanguage = (langCode) => {
    if (!selectedLanguages.includes(langCode)) {
      const newTranslation = { language_code: langCode };
      fields.forEach(field => newTranslation[field] = '');
      
      onChange([...translations, newTranslation]);
      setSelectedLanguages([...selectedLanguages, langCode]);
    }
  };

  const removeLanguage = (langCode) => {
    onChange(translations.filter(t => t.language_code !== langCode));
    setSelectedLanguages(selectedLanguages.filter(l => l !== langCode));
  };

  const updateTranslation = (langCode, field, value) => {
    onChange(
      translations.map(t =>
        t.language_code === langCode ? { ...t, [field]: value } : t
      )
    );
  };

  const availableToAdd = LANGUAGES.filter(
    lang => !selectedLanguages.includes(lang.code)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
          <Globe className="w-4 h-4" />
          <span>Traducciones</span>
        </label>
        
        {availableToAdd.length > 0 && (
          <div className="relative group">
            <button
              type="button"
              className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar idioma</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {availableToAdd.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => addLanguage(lang.code)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-orange-50 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center space-x-2"
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {translations.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-sm">Agrega al menos una traducción</p>
        </div>
      )}

      {translations.map((translation) => {
        const lang = LANGUAGES.find(l => l.code === translation.language_code);
        return (
          <div key={translation.language_code} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{lang?.flag}</span>
                <span className="font-medium text-gray-900">{lang?.name}</span>
              </div>
              {translations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLanguage(translation.language_code)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {fields.includes('name') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={translation.name || ''}
                  onChange={(e) => updateTranslation(translation.language_code, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={`Nombre en ${lang?.name}`}
                  required
                />
              </div>
            )}

            {fields.includes('description') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={translation.description || ''}
                  onChange={(e) => updateTranslation(translation.language_code, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={`Descripción en ${lang?.name}`}
                  rows="3"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TranslationFields;