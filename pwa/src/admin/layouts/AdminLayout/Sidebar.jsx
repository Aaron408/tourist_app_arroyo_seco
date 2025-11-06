import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useLanguageStore } from '../../stores/languageStore';

const Sidebar = () => {
  const { t } = useLanguageStore();

  const navigation = [
    { name: t('navigation.dashboard.title'), path: ROUTES.DASHBOARD },
    {
      name: t('navigation.catalogs.title'),
      children: [
        { name: t('navigation.catalogs.recipes'), path: ROUTES.ADMIN_RECIPES },
        { name: t('navigation.catalogs.ingredients'), path: ROUTES.ADMIN_INGREDIENTS },
        { name: t('navigation.catalogs.techniques'), path: ROUTES.ADMIN_TECHNIQUES },
        { name: t('navigation.catalogs.tools'), path: ROUTES.ADMIN_TOOLS },
        { name: t('navigation.catalogs.locations'), path: ROUTES.ADMIN_LOCATIONS },
      ]
    },
    {
      name: t('navigation.events.title'),
      children: [
        { name: t('navigation.events.workshops'), path: ROUTES.ADMIN_WORKSHOPS },
        { name: t('navigation.events.routes'), path: ROUTES.ADMIN_ROUTES },
      ]
    },
    { name: t('navigation.translations.title'), path: ROUTES.ADMIN_TRANSLATIONS },
    { name: t('navigation.feedback.title'), path: ROUTES.ADMIN_FEEDBACK },
    { name: t('navigation.users.title'), path: ROUTES.ADMIN_USERS },
    { name: t('navigation.statistics.title'), path: ROUTES.ADMIN_MONITORING },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navigation.map((item, idx) => (
          <div key={idx}>
            {!item.children && (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-amber-50 ${isActive ? 'bg-amber-100 font-semibold' : ''}`
                }
              >
                {item.name}
              </NavLink>
            )}
            {item.children && (
              <>
                <p className="px-3 py-2 text-gray-500 uppercase text-xs font-semibold">{item.name}</p>
                <div className="ml-3 space-y-1">
                  {item.children.map((child, i) => (
                    <NavLink
                      key={i}
                      to={child.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded hover:bg-amber-50 ${isActive ? 'bg-amber-100 font-semibold' : ''}`
                      }
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
