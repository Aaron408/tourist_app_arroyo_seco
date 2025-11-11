import { useEffect, useState } from 'react';
import { useRecipes } from '../../hooks/useRecipes';
import { useLanguageStore } from '../../stores/languageStore';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import ConfirmDialog from '../../../components/ConfirmDialog';
import RecipeForm from '../../components/forms/RecipeForm';

const Recipes = () => {
  const { recipes, loading, error, fetchRecipes, createRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const { currentLanguage } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });

  useEffect(() => {
    fetchRecipes({ language: currentLanguage });
  }, [currentLanguage]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleCreate = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    const result = editingRecipe
      ? await updateRecipe(editingRecipe.id, formData)
      : await createRecipe(formData);

    if (result.success) {
      setIsModalOpen(false);
      setEditingRecipe(null);
      showToast(
        editingRecipe ? 'Receta actualizada exitosamente' : 'Receta creada exitosamente',
        'success'
      );
    } else {
      showToast('Error: ' + result.error, 'error');
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const handleDeleteConfirm = async () => {
    const result = await deleteRecipe(confirmDialog.id);
    if (result.success) {
      showToast('Receta eliminada exitosamente', 'success');
    } else {
      showToast('Error al eliminar: ' + result.error, 'error');
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const translation = recipe.translations?.find(t => t.language_code === currentLanguage) || recipe.translations?.[0];
    return translation?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading && recipes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar receta"
        message="¿Estás seguro de eliminar esta receta? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Recetas</h1>
            <p className="text-sm text-gray-600 mt-1">Gestiona las recetas gastronómicas</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Receta</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar recetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-orange-50 to-red-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Duración</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Dificultad</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecipes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No se encontraron recetas
                    </td>
                  </tr>
                ) : (
                  filteredRecipes.map((recipe) => {
                    const translation = recipe.translations?.find(t => t.language_code === currentLanguage) || recipe.translations?.[0];
                    return (
                      <tr key={recipe.id} className="hover:bg-orange-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recipe.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{translation?.name || 'Sin nombre'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{translation?.description || 'Sin descripción'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{recipe.duration || '-'} min</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            recipe.difficulty === 1 ? 'bg-green-100 text-green-800' :
                            recipe.difficulty === 2 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {recipe.difficulty === 1 ? 'Fácil' : recipe.difficulty === 2 ? 'Media' : 'Difícil'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                          <button
                            onClick={() => handleEdit(recipe)}
                            className="text-orange-600 hover:text-orange-900 inline-flex items-center"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(recipe.id)}
                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRecipe(null);
          }}
          title={editingRecipe ? 'Editar Receta' : 'Nueva Receta'}
          size="lg"
        >
          <RecipeForm
            initialData={editingRecipe}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingRecipe(null);
            }}
          />
        </Modal>
      </div>
    </>
  );
};

export default Recipes;