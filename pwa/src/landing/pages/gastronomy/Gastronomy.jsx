import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, BookOpen, Leaf, Wrench, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import { ROUTES } from '../../utils/constants';

const Gastronomy = () => {
  const { t } = useLanguageStore();

  const gastronomyCards = [
    {
      id: 1,
      icon: <BookOpen className="w-12 h-12" />,
      title: t('navigation.gastronomy.recipes'),
      description: t('gastronomy.recipesDescription'),
      route: ROUTES.RECIPES,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      id: 2,
      icon: <Leaf className="w-12 h-12" />,
      title: t('navigation.gastronomy.ingredients'),
      description: t('gastronomy.ingredientsSubtitle'),
      route: ROUTES.INGREDIENTS,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      id: 3,
      icon: <ChefHat className="w-12 h-12" />,
      title: t('navigation.gastronomy.techniques'),
      description: t('gastronomy.techniquesSubtitle'),
      route: ROUTES.CULINARY_TECHNIQUES,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      id: 4,
      icon: <Wrench className="w-12 h-12" />,
      title: t('navigation.gastronomy.tools'),
      description: t('gastronomy.toolsSubtitle'),
      route: ROUTES.TOOLS,
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-xl">
                <ChefHat className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              {t('navigation.gastronomy.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {t('gastronomy.gastronomyDesc')}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to={ROUTES.RECIPES}
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('gastronomy.viewRecipes')}
              </Link>
              <Link
                to={ROUTES.INTERACTIVE_SKETCH}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all shadow-lg"
              >
                {t('common.viewInteractiveMap')}
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Main Content Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-amber-600" />
            <h2 className="text-4xl font-bold text-gray-900">
              {t('gastronomy.exploreOurGastronomy')}
            </h2>
            <Sparkles className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('gastronomy.exploreSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gastronomyCards.map((card) => (
            <Link
              key={card.id}
              to={card.route}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className={`${card.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <div className={card.iconColor}>
                    {card.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 transition-all">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-amber-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                  <span>{t('common.learnMore')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-5 rounded-bl-full`}></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Traditional Recipes Showcase */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t('gastronomy.traditionalRecipes')}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {t('gastronomy.recipesDescription')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white rounded-full p-1 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">{t('gastronomy.step1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white rounded-full p-1 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">{t('gastronomy.step2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white rounded-full p-1 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">{t('gastronomy.step3')}</span>
                </li>
              </ul>
              <Link
                to={ROUTES.RECIPES}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('gastronomy.viewRecipes')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                alt="Traditional Food"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center p-12">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">
                {t('gastronomy.readyToStart')}
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {t('gastronomy.readyToStartDesc')}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                to={ROUTES.RECIPES}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all text-center shadow-lg"
              >
                {t('gastronomy.viewAllRecipes')}
              </Link>
              <Link
                to={ROUTES.INTERACTIVE_SKETCH}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all text-center"
              >
                {t('gastronomy.exploreMap')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gastronomy;