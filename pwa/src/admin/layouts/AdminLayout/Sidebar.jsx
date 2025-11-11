import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useLanguageStore } from '../../stores/languageStore';
import { 
  LayoutDashboard, 
  Utensils, 
  Beef, 
  ChefHat, 
  UtensilsCrossed, 
  MapPin, 
  GraduationCap,
  Users,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguageStore();
  const [expandedSections, setExpandedSections] = useState({ gastronomy: true });

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const navigation = [
    { 
      name: t('navigation.dashboard.title') || 'Dashboard', 
      path: ROUTES.DASHBOARD,
      icon: LayoutDashboard
    },
    {
      name: t('navigation.gastronomy.title') || 'Gastronomía',
      icon: Utensils,
      key: 'gastronomy',
      children: [
        { 
          name: t('navigation.gastronomy.recipes') || 'Recetas', 
          path: ROUTES.ADMIN_RECIPES,
          icon: ChefHat
        },
        { 
          name: t('navigation.gastronomy.ingredients') || 'Ingredientes', 
          path: ROUTES.ADMIN_INGREDIENTS,
          icon: Beef
        },
        { 
          name: t('navigation.gastronomy.techniques') || 'Técnicas', 
          path: ROUTES.ADMIN_TECHNIQUES,
          icon: UtensilsCrossed
        },
        { 
          name: t('navigation.gastronomy.tools') || 'Utensilios', 
          path: ROUTES.ADMIN_TOOLS,
          icon: UtensilsCrossed
        },
      ]
    },
    { 
      name: t('navigation.locations.title') || 'Ubicaciones', 
      path: ROUTES.ADMIN_LOCATIONS,
      icon: MapPin
    },
    { 
      name: t('navigation.workshops.title') || 'Talleres', 
      path: ROUTES.ADMIN_WORKSHOPS,
      icon: GraduationCap
    },
    { 
      name: t('navigation.users.title') || 'Usuarios', 
      path: ROUTES.ADMIN_USERS,
      icon: Users
    },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-600">
          <h2 className="text-white font-bold text-lg">Menú</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item, idx) => (
            <div key={idx}>
              {!item.children && (
                <NavLink
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md font-semibold' 
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`
                  }
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span>{item.name}</span>
                </NavLink>
              )}
              
              {item.children && (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSection(item.key)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform ${
                        expandedSections[item.key] ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedSections[item.key] && (
                    <div className="ml-4 space-y-1 border-l-2 border-orange-200">
                      {item.children.map((child, i) => (
                        <NavLink
                          key={i}
                          to={child.path}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ml-2 ${
                              isActive 
                                ? 'bg-orange-100 text-orange-700 font-semibold border-l-4 border-orange-500' 
                                : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                            }`
                          }
                        >
                          {child.icon && <child.icon className="w-4 h-4" />}
                          <span className="text-sm">{child.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
          <p className="text-xs text-gray-600 text-center">
            Arroyo Seco Tourism
          </p>
          <p className="text-xs text-gray-500 text-center">
            v1.0.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;