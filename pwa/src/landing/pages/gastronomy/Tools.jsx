import { useState } from 'react';
import { Wrench, Star, History, Info } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import Header from './components/Header';
import Filters from './components/Filters';

const Tools = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const tools = [
    {
      id: 1,
      name: 'Molcajete',
      description: 'Mortero de piedra volcánica usado para moler especias, chiles y preparar salsas',
      image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800&q=80',
      type: 'grinding',
      material: 'Piedra volcánica',
      origin: 'Prehispánico',
      uses: ['Salsas', 'Guacamole', 'Moler especias'],
      care: 'Lavar con agua y sal, secar completamente',
      history: 'Utilizado desde hace más de 3000 años en Mesoamérica',
    },
    {
      id: 2,
      name: 'Comal',
      description: 'Plancha circular para cocer tortillas, tostar chiles y semillas',
      image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800&q=80',
      type: 'cooking',
      material: 'Barro o metal',
      origin: 'Tradicional',
      uses: ['Tortillas', 'Tostar', 'Asar'],
      care: 'Curar antes del primer uso, limpiar en seco cuando es posible',
      history: 'Herramienta fundamental en la cocina mexicana por siglos',
    },
    {
      id: 3,
      name: 'Metate',
      description: 'Piedra rectangular con inclinación para moler maíz nixtamalizado',
      image: 'https://images.unsplash.com/photo-1628191010210-a59de33e8417?w=800&q=80',
      type: 'grinding',
      material: 'Piedra volcánica',
      origin: 'Prehispánico',
      uses: ['Masa de maíz', 'Cacao', 'Chiles secos'],
      care: 'Lavar con agua, sin jabón, secar al sol',
      history: 'Instrumento esencial en la preparación del nixtamal',
    },
    {
      id: 4,
      name: 'Olla de Barro',
      description: 'Recipiente de arcilla para cocinar lentamente y conservar el sabor',
      image: 'https://images.unsplash.com/photo-1585937424481-ce2f3d55eeaa?w=800&q=80',
      type: 'cooking',
      material: 'Barro',
      origin: 'Tradicional',
      uses: ['Frijoles', 'Mole', 'Guisos'],
      care: 'Curar antes de usar, evitar cambios bruscos de temperatura',
      history: 'Preserva tradiciones culinarias ancestrales',
    },
    {
      id: 5,
      name: 'Molinillo',
      description: 'Batidor de madera para espumar chocolate y atole',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
      type: 'mixing',
      material: 'Madera',
      origin: 'Colonial',
      uses: ['Chocolate', 'Atole', 'Café de olla'],
      care: 'Lavar con agua tibia, secar bien para evitar moho',
      history: 'Diseño que permite crear espuma perfecta',
    },
    {
      id: 6,
      name: 'Tortillero',
      description: 'Canasta tejida para mantener tortillas calientes',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80',
      type: 'preservation',
      material: 'Palma o carrizo',
      origin: 'Tradicional',
      uses: ['Tortillas', 'Pan', 'Tamales'],
      care: 'Mantener seco, airear regularmente',
      history: 'Artesanía que mantiene viva la tradición',
    },
  ];

  const types = ['grinding', 'cooking', 'mixing', 'preservation'];

  const getTypeColor = (type) => {
    const colors = {
      'grinding': 'bg-amber-100 text-amber-700 border-amber-200',
      'cooking': 'bg-orange-100 text-orange-700 border-orange-200',
      'mixing': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'preservation': 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || tool.type === selectedType;
    return matchesSearch && matchesType;
  });

  const typeLabels = {};
  types.forEach(type => {
    typeLabels[type] = t.gastronomyPage.tools.types[type];
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-white">
      <Header
        Icon={Wrench}
        title={t.gastronomyPage.tools.title}
        subtitle={t.gastronomyPage.tools.subtitle}
        gradientFrom="from-amber-600"
        gradientTo="to-yellow-600"
      />

      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.gastronomyPage.tools.search}
        selectedFilter={selectedType}
        setSelectedFilter={setSelectedType}
        filters={types}
        filterLabels={typeLabels}
        allLabel={t.gastronomyPage.tools.all}
        primaryColor="amber"
      />

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredTools.length} {filteredTools.length === 1 ? t.gastronomyPage.tools.toolFound : t.gastronomyPage.tools.toolsFound}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getTypeColor(tool.type)}`}>
                    {t.gastronomyPage.tools.types[tool.type]}
                  </span>
                </div>

                {/* Origin Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                    <History className="w-3 h-3" />
                    {tool.origin}
                  </span>
                </div>

                {/* Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {tool.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">{tool.material}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  {tool.description}
                </p>

                {/* Uses */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {t.gastronomyPage.tools.mainUses}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tool.uses.map((use, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Care Instructions */}
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs font-semibold text-yellow-900 uppercase mb-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {t.gastronomyPage.tools.care}
                  </p>
                  <p className="text-xs text-yellow-800">{tool.care}</p>
                </div>

                {/* History */}
                <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs font-semibold text-amber-900 uppercase mb-1 flex items-center gap-1">
                    <History className="w-3 h-3" />
                    {t.gastronomyPage.tools.history}
                  </p>
                  <p className="text-xs text-amber-800">{tool.history}</p>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg">
                  {t.gastronomyPage.ingredients.seeMoreDetails}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gastronomyPage.tools.noToolsFound}</h3>
            <p className="text-gray-600">{t.gastronomyPage.recipes.tryOtherTerms}</p>
          </div>
        )}
      </section>

      {/* Cultural Significance Section */}
      <section className="bg-gradient-to-r from-amber-100 to-yellow-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t.gastronomyPage.tools.culturalHeritage}
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t.gastronomyPage.tools.culturalHeritageDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t.gastronomyPage.tools.millennialTradition}</h3>
                <p className="text-gray-600 text-sm">
                  {t.gastronomyPage.tools.millennialTraditionDesc}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t.gastronomyPage.tools.superiorQuality}</h3>
                <p className="text-gray-600 text-sm">
                  {t.gastronomyPage.tools.superiorQualityDesc}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t.gastronomyPage.tools.localCrafts}</h3>
                <p className="text-gray-600 text-sm">
                  {t.gastronomyPage.tools.localCraftsDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;