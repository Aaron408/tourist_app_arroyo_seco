import { Download, Calendar, Bell, Users, Zap } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

const Events = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Info Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t.eventsPage.main.downloadAppTitle}
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              {t.eventsPage.main.downloadAppDescription}
            </p>
          </div>

          {/* Features Grid - Más compacto */}
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <div className="flex items-start space-x-3 bg-orange-50 rounded-lg p-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-9 w-9 rounded-md bg-orange-600 text-white">
                  <Calendar className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-900 leading-snug">
                {t.eventsPage.main.feature1}
              </p>
            </div>

            <div className="flex items-start space-x-3 bg-orange-50 rounded-lg p-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-9 w-9 rounded-md bg-orange-600 text-white">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-900 leading-snug">
                {t.eventsPage.main.feature2}
              </p>
            </div>

            <div className="flex items-start space-x-3 bg-orange-50 rounded-lg p-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-9 w-9 rounded-md bg-orange-600 text-white">
                  <Zap className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-900 leading-snug">
                {t.eventsPage.main.feature3}
              </p>
            </div>

            <div className="flex items-start space-x-3 bg-orange-50 rounded-lg p-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-9 w-9 rounded-md bg-orange-600 text-white">
                  <Bell className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-900 leading-snug">
                {t.eventsPage.main.feature4}
              </p>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.xiaogourmet.touristapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm md:text-base hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              {t.eventsPage.main.downloadNow}
            </a>
            <p className="text-gray-500 text-xs md:text-sm mt-3">
              {t.eventsPage.main.moreInfo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;