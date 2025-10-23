import { Link } from 'react-router-dom';

const Footer = ({ footerSections, t }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🍽️</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  Arroyo Seco
                </span>
                <span className="text-sm text-amber-400">
                  {t('navigation.gastronomy.title')}
                </span>
              </div>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              {t('footer.footerDescription')}
            </p>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.route} 
                      className="hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Arroyo Seco. {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center space-x-4">
            <span>📍 Arroyo Seco, Querétaro</span>
            <span>|</span>
            <span>🏔️ Sierra Gorda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;