import { useEffect, useState } from 'react';
import { useLanguageStore } from '../stores/languageStore';
import { useIngredients } from '../hooks/useIngredients';
import { useRecipes } from '../hooks/useRecipes';
import { useTechniques } from '../hooks/useTechniques';
import { useTools } from '../hooks/useTools';
import { 
  ChefHat, 
  UtensilsCrossed, 
  Lightbulb, 
  Wrench,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const { t, currentLanguage } = useLanguageStore();
  const { ingredients, fetchIngredients } = useIngredients();
  const { recipes, fetchRecipes } = useRecipes();
  const { techniques, fetchTechniques } = useTechniques();
  const { tools, fetchTools } = useTools();
  
  const [stats, setStats] = useState({
    ingredients: 0,
    recipes: 0,
    techniques: 0,
    tools: 0
  });

  useEffect(() => {
    // Fetch all data
    fetchIngredients({ language: currentLanguage });
    fetchRecipes({ language: currentLanguage });
    fetchTechniques({ language: currentLanguage });
    fetchTools({ language: currentLanguage });
  }, [currentLanguage]);

  useEffect(() => {
    // Update stats when data changes
    setStats({
      ingredients: ingredients.length,
      recipes: recipes.length,
      techniques: techniques.length,
      tools: tools.length
    });
  }, [ingredients, recipes, techniques, tools]);

  const statsCards = [
    {
      title: 'Ingredientes',
      value: stats.ingredients,
      icon: ChefHat,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Recetas',
      value: stats.recipes,
      icon: UtensilsCrossed,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      change: '+8%',
      isPositive: true
    },
    {
      title: 'Técnicas',
      value: stats.techniques,
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      change: '+5%',
      isPositive: true
    },
    {
      title: 'Utensilios',
      value: stats.tools,
      icon: Wrench,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      change: '+3%',
      isPositive: true
    }
  ];

  const recentActivity = [
    {
      action: 'Nueva receta agregada',
      item: 'Tacos de Carnitas Estilo Querétaro',
      time: 'Hace 2 horas',
      icon: UtensilsCrossed,
      color: 'text-orange-600'
    },
    {
      action: 'Ingrediente actualizado',
      item: 'Chile de Árbol',
      time: 'Hace 5 horas',
      icon: ChefHat,
      color: 'text-red-600'
    },
    {
      action: 'Nueva técnica agregada',
      item: 'Cocción al Comal',
      time: 'Hace 1 día',
      icon: Lightbulb,
      color: 'text-yellow-600'
    },
    {
      action: 'Utensilio agregado',
      item: 'Molcajete de Piedra',
      time: 'Hace 2 días',
      icon: Wrench,
      color: 'text-blue-600'
    }
  ];

  const quickActions = [
    {
      title: 'Agregar Receta',
      description: 'Crea una nueva receta gastronómica',
      icon: UtensilsCrossed,
      color: 'from-orange-500 to-red-600',
      link: '/admin/gastronomy/recipes'
    },
    {
      title: 'Gestionar Ingredientes',
      description: 'Administra el catálogo de ingredientes',
      icon: ChefHat,
      color: 'from-red-500 to-pink-600',
      link: '/admin/gastronomy/ingredients'
    },
    {
      title: 'Técnicas Culinarias',
      description: 'Organiza las técnicas de cocina',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-600',
      link: '/admin/gastronomy/techniques'
    },
    {
      title: 'Ver Ubicaciones',
      description: 'Explora los lugares turísticos',
      icon: MapPin,
      color: 'from-green-500 to-emerald-600',
      link: '/admin/locations'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Panel de Control - Ruta del Sabor
        </h1>
        <p className="text-gray-600">
          Bienvenido al sistema de administración de Arroyo Seco, Querétaro
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const ChangeIcon = stat.isPositive ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <ChangeIcon className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Acciones Rápidas
              </h2>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.link}
                    className="group p-4 rounded-lg border border-gray-200 hover:border-transparent hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50 hover:scale-105"
                  >
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${action.color} mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Actividad Reciente
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.item}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tourism Stats */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Ruta del Sabor</h2>
            <MapPin className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-orange-100 mb-6">
            Sistema de turismo gastronómico de Arroyo Seco, Querétaro
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-orange-100 text-sm mb-1">Ubicaciones</p>
              <p className="text-2xl font-bold">12+</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-orange-100 text-sm mb-1">Talleres</p>
              <p className="text-2xl font-bold">8+</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Estado del Sistema</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Operativo</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Base de Datos</span>
              <span className="text-sm font-medium text-green-600">Conectada</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">API Gateway</span>
              <span className="text-sm font-medium text-green-600">Activo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Almacenamiento</span>
              <span className="text-sm font-medium text-blue-600">78% usado</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Última actualización</span>
              <span className="text-sm font-medium text-gray-900">Hoy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              ¡Bienvenido al Panel de Administración!
            </h3>
            <p className="text-gray-600 text-sm">
              Gestiona todo el contenido gastronómico y turístico de Arroyo Seco desde aquí. 
              Utiliza las secciones del menú lateral para navegar entre las diferentes categorías.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;