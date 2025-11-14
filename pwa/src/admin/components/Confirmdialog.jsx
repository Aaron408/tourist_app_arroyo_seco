import React from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

/**
 * ConfirmDialog - Diálogo de confirmación reutilizable
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controla si el diálogo está visible
 * @param {Function} props.onClose - Función para cerrar el diálogo
 * @param {Function} props.onConfirm - Función que se ejecuta al confirmar
 * @param {string} props.title - Título del diálogo
 * @param {string} props.message - Mensaje del diálogo
 * @param {string} props.confirmText - Texto del botón de confirmar (default: "Confirmar")
 * @param {string} props.cancelText - Texto del botón de cancelar (default: "Cancelar")
 * @param {string} props.type - Tipo de diálogo: 'warning', 'danger', 'success', 'info' (default: 'warning')
 * @param {boolean} props.loading - Muestra estado de carga en el botón de confirmar
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = '¿Confirmar acción?',
  message = '¿Estás seguro de que deseas continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
  loading = false,
}) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  // Configuración de colores y estilos según el tipo
  const typeConfig = {
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-50',
      buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
      buttonText: 'text-white',
    },
    danger: {
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-50',
      buttonBg: 'bg-red-500 hover:bg-red-600',
      buttonText: 'text-white',
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-50',
      buttonBg: 'bg-green-500 hover:bg-green-600',
      buttonText: 'text-white',
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
      buttonBg: 'bg-blue-500 hover:bg-blue-600',
      buttonText: 'text-white',
    },
  };

  const config = typeConfig[type] || typeConfig.warning;
  const IconComponent = config.icon;

  return (
    <>
      {/* Styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes dialogSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.2s ease-out' }}
        onClick={handleBackdropClick}
      >
        {/* Dialog */}
        <div
          className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden transform border border-gray-200"
          style={{ animation: 'dialogSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full ${config.iconBg} flex items-center justify-center`}>
                <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
              </div>

              {/* Title & Close Button */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {title}
                </h3>
              </div>

              <button
                onClick={onClose}
                disabled={loading}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="px-6 pb-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${config.buttonBg} ${config.buttonText} min-w-[100px] flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDialog;
