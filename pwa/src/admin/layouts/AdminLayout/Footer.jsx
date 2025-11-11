const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-red-600 border-t-4 border-orange-700 py-3 sm:py-4 text-center shadow-lg">
      <div className="px-4">
        <p className="text-xs sm:text-sm text-white font-medium">
          © {new Date().getFullYear()} Arroyo Seco Tourism. Todos los derechos reservados.
        </p>
        <p className="text-xs text-orange-100 mt-1 hidden sm:block">
          Descubre los sabores auténticos de Arroyo Seco
        </p>
      </div>
    </footer>
  );
};

export default Footer;