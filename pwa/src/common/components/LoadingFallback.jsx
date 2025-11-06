const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  </div>
);

export default LoadingFallback;
