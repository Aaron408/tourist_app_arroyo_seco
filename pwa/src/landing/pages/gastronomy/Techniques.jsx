import { useState } from 'react';
import { ChefHat, Clock, BookOpen, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import Header from './components/Header';
import Filters from './components/Filters';

const CulinaryTechniques = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const techniques = [
    {
      id: 1,
      name: 'Nixtamalización',
      description: 'Proceso ancestral de cocción del maíz con cal para crear masa',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80',
      category: 'preparation',
      time: '8-12 horas',
      difficulty: 'medium',
      steps: 8,
      tools: ['Olla grande', 'Cal', 'Metate'],
    },
    {
      id: 2,
      name: 'Molienda en Metate',
      description: 'Técnica tradicional para moler granos y especias',
      image: 'https://images.unsplash.com/photo-1596797882870-8c33deeacb98?w=800&q=80',
      category: 'grinding',
      time: '30-45 min',
      difficulty: 'medium',
      steps: 5,
      tools: ['Metate', 'Mano de metate'],
    },
    {
      id: 3,
      name: 'Cocción en Comal',
      description: 'Método de cocción sobre superficie plana de barro o metal',
      image: 'https://images.unsplash.com/photo-1599974168528-80ddb8c13f90?w=800&q=80',
      category: 'cooking',
      time: '15-30 min',
      difficulty: 'easy',
      steps: 4,
      tools: ['Comal', 'Pala de madera'],
    },
    {
      id: 4,
      name: 'Fermentación de Pulque',
      description: 'Proceso de fermentación natural del aguamiel de maguey',
      image: 'https://images.unsplash.com/photo-1582106245687-672783c674d4?w=800&q=80',
      category: 'fermentation',
      time: '3-7 días',
      difficulty: 'hard',
      steps: 12,
      tools: ['Tinas de madera', 'Jícaras', 'Acocote'],
    },
    {
      id: 5,
      name: 'Secado al Sol',
      description: 'Conservación de chiles y frutas mediante deshidratación solar',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      category: 'preservation',
      time: '2-5 días',
      difficulty: 'easy',
      steps: 3,
      tools: ['Petates', 'Mallas', 'Estructuras de madera'],
    },
    {
      id: 6,
      name: 'Tatemado',
      description: 'Técnica de asado directo sobre fuego para desarrollar sabores ahumados',
      image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80',
      category: 'cooking',
      time: '20-40 min',
      difficulty: 'medium',
      steps: 6,
      tools: ['Comal', 'Pinzas', 'Carbón o leña'],
    },
  ];

  const categories = ['preparation', 'grinding', 'cooking', 'fermentation', 'preservation'];

  const getCategoryColor = (category) => {
    const colors = {
      'preparation': 'bg-blue-100 text-blue-700',
      'grinding': 'bg-purple-100 text-purple-700',
      'cooking': 'bg-orange-100 text-orange-700',
      'fermentation': 'bg-green-100 text-green-700',
      'preservation': 'bg-amber-100 text-amber-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const filteredTechniques = techniques.filter(technique => {
    const matchesSearch = technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         technique.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || technique.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryLabels = {};
  categories.forEach(category => {
    categoryLabels[category] = t.gastronomyPage.techniques.categories[category];
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <Header
        Icon={ChefHat}
        title={t.gastronomyPage.techniques.title}
        subtitle={t.gastronomyPage.techniques.subtitle}
        gradientFrom="from-purple-600"
        gradientTo="to-pink-600"
      />

      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.gastronomyPage.techniques.search}
        selectedFilter={selectedCategory}
        setSelectedFilter={setSelectedCategory}
        filters={categories}
        filterLabels={categoryLabels}
        allLabel={t.gastronomyPage.techniques.all}
        primaryColor="purple"
      />

      {/* Techniques Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredTechniques.length} {filteredTechniques.length === 1 ? t.gastronomyPage.techniques.techniqueFound : t.gastronomyPage.techniques.techniquesFound}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTechniques.map((technique) => (
            <div
              key={technique.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(technique.category)}`}>
                    {t.gastronomyPage.techniques.categories[technique.category]}
                  </span>
                </div>

                {/* Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {technique.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  {technique.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{t.gastronomyPage.techniques.time}:</span>
                    <span>{technique.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{technique.steps} {t.gastronomyPage.techniques.steps}</span>
                  </div>
                </div>

                {/* Tools */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    {t.gastronomyPage.techniques.toolsNeeded}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {technique.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                  {t.gastronomyPage.techniques.seeTutorial} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTechniques.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.gastronomyPage.techniques.noTechniquesFound}
            </h3>
            <p className="text-gray-600">{t.gastronomyPage.recipes.tryOtherTerms}</p>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t.gastronomyPage.techniques.videoTutorials}</h3>
              <p className="text-gray-600 text-sm">Aprende con guías visuales detalladas</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t.gastronomyPage.techniques.expertTips}</h3>
              <p className="text-gray-600 text-sm">Conocimientos de maestros artesanos</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t.gastronomyPage.techniques.culturalContext}</h3>
              <p className="text-gray-600 text-sm">Descubre el origen de cada técnica</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CulinaryTechniques;