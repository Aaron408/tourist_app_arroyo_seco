import { useState } from 'react';
import { Clock, MapPin, Users, Calendar, BookOpen, Filter } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

const Workshops = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const workshops = [
    {
      id: 1,
      name: 'Elaboración de Gorditas Tradicionales',
      description: 'Aprende a preparar las auténticas gorditas de Arroyo Seco con técnicas ancestrales transmitidas de generación en generación.',
      instructor: 'Doña María Sánchez',
      category: 'gastronomy',
      duration: '3 horas',
      date: '2025-11-20',
      schedule: '10:00 AM - 1:00 PM',
      location: 'Casa de la Cultura',
      capacity: '15 personas',
      level: 'beginner',
      materials: 'Incluidos',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
      requirements: ['Mandil', 'Ganas de aprender']
    },
    {
      id: 2,
      name: 'Tejido de Palma',
      description: 'Descubre el arte tradicional del tejido de palma y crea tus propias artesanías decorativas.',
      instructor: 'Maestro Artesano Pedro González',
      category: 'crafts',
      duration: '4 horas',
      date: '2025-11-22',
      schedule: '9:00 AM - 1:00 PM',
      location: 'Taller Artesanal Municipal',
      capacity: '12 personas',
      level: 'allLevels',
      materials: 'Incluidos',
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800',
      requirements: ['Paciencia', 'Creatividad']
    },
    {
      id: 3,
      name: 'Fotografía de Paisajes Rurales',
      description: 'Captura la belleza natural de Arroyo Seco y aprende técnicas profesionales de fotografía de paisaje.',
      instructor: 'Fotógrafo Luis Hernández',
      category: 'photography',
      duration: '5 horas',
      date: '2025-11-25',
      schedule: '7:00 AM - 12:00 PM',
      location: 'Plaza Principal (punto de encuentro)',
      capacity: '10 personas',
      level: 'intermediate',
      materials: 'Traer cámara propia',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
      requirements: ['Cámara fotográfica', 'Calzado cómodo']
    },
    {
      id: 4,
      name: 'Preparación de Dulces Típicos',
      description: 'Elabora dulces tradicionales mexicanos como jamoncillo, glorias y dulce de leche.',
      instructor: 'Chef Guadalupe Ramírez',
      category: 'gastronomy',
      duration: '3 horas',
      date: '2025-11-27',
      schedule: '2:00 PM - 5:00 PM',
      location: 'Casa de la Cultura',
      capacity: '20 personas',
      level: 'beginner',
      materials: 'Incluidos',
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
      requirements: ['Mandil', 'Recipientes para llevar dulces']
    },
    {
      id: 5,
      name: 'Historia y Leyendas de Arroyo Seco',
      description: 'Un recorrido narrativo por las historias y leyendas que han marcado la identidad de nuestro pueblo.',
      instructor: 'Historiador Roberto Martínez',
      category: 'cultural',
      duration: '2 horas',
      date: '2025-11-28',
      schedule: '5:00 PM - 7:00 PM',
      location: 'Recorrido por el Centro Histórico',
      capacity: '30 personas',
      level: 'allLevels',
      materials: 'No requiere',
      image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800',
      requirements: ['Calzado cómodo', 'Interés por la historia']
    },
    {
      id: 6,
      name: 'Cerámica y Alfarería',
      description: 'Trabaja el barro y crea tus propias piezas de cerámica con técnicas tradicionales.',
      instructor: 'Maestra Alfarera Carmen López',
      category: 'crafts',
      duration: '4 horas',
      date: '2025-12-01',
      schedule: '10:00 AM - 2:00 PM',
      location: 'Taller de Alfarería',
      capacity: '8 personas',
      level: 'beginner',
      materials: 'Incluidos',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      requirements: ['Ropa que se pueda ensuciar', 'Ganas de crear']
    }
  ];

  const categories = [
    { value: 'all', label: t.eventsPage.workshops.all },
    { value: 'gastronomy', label: t.eventsPage.workshops.categories.gastronomy },
    { value: 'crafts', label: t.eventsPage.workshops.categories.crafts },
    { value: 'photography', label: t.eventsPage.workshops.categories.photography },
    { value: 'cultural', label: t.eventsPage.workshops.categories.cultural }
  ];

  const filteredWorkshops = selectedCategory === 'all' 
    ? workshops 
    : workshops.filter(w => w.category === selectedCategory);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-MX', options);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.eventsPage.workshops.title}</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            {t.eventsPage.workshops.subtitle}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="text-purple-600 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">{t.eventsPage.workshops.filterByCategory}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === cat.value
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredWorkshops.map(workshop => (
            <div key={workshop.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={workshop.image} 
                  alt={workshop.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(workshop.level)}`}>
                    {t.eventsPage.workshops.level[workshop.level]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{workshop.name}</h3>
                <p className="text-gray-600 mb-4">{workshop.description}</p>

                {/* Instructor */}
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">{t.eventsPage.workshops.instructor}</p>
                  <p className="font-semibold text-purple-900">{workshop.instructor}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start">
                    <Calendar className="text-purple-600 mr-2 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">{t.eventsPage.main.date}</p>
                      <p className="text-sm font-semibold">{formatDate(workshop.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-purple-600 mr-2 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">{t.eventsPage.main.schedule}</p>
                      <p className="text-sm font-semibold">{workshop.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-purple-600 mr-2 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">{t.eventsPage.main.location}</p>
                      <p className="text-sm font-semibold">{workshop.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="text-purple-600 mr-2 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">{t.eventsPage.workshops.capacity}</p>
                      <p className="text-sm font-semibold">{workshop.capacity}</p>
                    </div>
                  </div>
                </div>

                {/* Additional info */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t.eventsPage.workshops.duration}:</span>
                    <span className="text-sm font-semibold">{workshop.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t.eventsPage.workshops.materials}:</span>
                    <span className="text-sm font-semibold">{workshop.materials}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{t.eventsPage.workshops.requirements}:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {workshop.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.eventsPage.workshops.noWorkshopsFound}</p>
          </div>
        )}

        {/* Additional information */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">{t.eventsPage.workshops.generalInfo}</h2>
          <div className="grid md:grid-cols-3 gap-6 text-purple-100">
            <div>
              <h3 className="font-bold text-white mb-2">{t.eventsPage.workshops.registrations}</h3>
              <p>{t.eventsPage.workshops.registrationsDesc}</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">{t.eventsPage.workshops.certificates}</h3>
              <p>{t.eventsPage.workshops.certificatesDesc}</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">{t.eventsPage.workshops.contact}</h3>
              <p>{t.eventsPage.workshops.contactDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshops;