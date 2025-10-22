export const formatDate = (date, locale = 'es-MX') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const generateSlug = (text) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};

export const handleApiError = (error) => {
  if (!error.response) {
    return 'Error de conexión. Por favor, verifica tu conexión a internet.';
  }
  
  const { status } = error.response;
  
  switch (status) {
    case 400:
      return 'Solicitud inválida. Por favor, verifica los datos enviados.';
    case 401:
      return 'No autorizado. Por favor, inicia sesión nuevamente.';
    case 403:
      return 'Acceso denegado. No tienes permisos para esta acción.';
    case 404:
      return 'Recurso no encontrado.';
    case 500:
      return 'Error en el servidor. Por favor, intenta más tarde.';
    default:
      return `Error inesperado (${status}). Por favor, intenta más tarde.`;
  }
};