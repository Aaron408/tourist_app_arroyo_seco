import { useLanguageStore } from '../../stores/languageStore';

const MobileAppSection = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Content Section */}
          <div className='text-center'>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t.homePage.mobileAppTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t.homePage.mobileAppDescription}
            </p>
            {/* <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-2xl mr-3 text-green-500">✓</span>
                <span className="text-gray-700">{t.homePage.mobileAppFeature1}</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3 text-green-500">✓</span>
                <span className="text-gray-700">{t.homePage.mobileAppFeature2}</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3 text-green-500">✓</span>
                <span className="text-gray-700">{t.homePage.mobileAppFeature3}</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3 text-green-500">✓</span>
                <span className="text-gray-700">{t.homePage.mobileAppFeature4}</span>
              </li>
            </ul> */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.xiaogourmet.touristapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-amber-600 to-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-amber-700 hover:to-orange-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t.homePage.downloadPlayStore}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;