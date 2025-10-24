import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Search } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

const Events = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        name: 'La Ruta del Sabor',
        date: '2025-11-15',
        time: '10:00 AM',
        location: 'Centro de Arroyo Seco',
        description: 'El evento gastronómico más importante de Arroyo Seco',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        category: 'gastronomy',
        featured: true
      },
      {
        id: 2,
        name: 'Festival de la Gordita',
        date: '2025-12-01',
        time: '12:00 PM',
        location: 'Plaza Principal',
        description: 'Celebración anual de la gordita tradicional',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
        category: 'gastronomy'
      },
      {
        id: 3,
        name: 'Feria Artesanal',
        date: '2025-11-20',
        time: '9:00 AM',
        location: 'Jardín Municipal',
        description: 'Exposición y venta de artesanías locales',
        image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800',
        category: 'cultural'
      },
      {
        id: 4,
        name: 'Noche de Leyendas',
        date: '2025-10-31',
        time: '7:00 PM',
        location: 'Teatro Municipal',
        description: 'Recorrido nocturno por lugares emblemáticos',
        image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800',
        category: 'cultural'
      },
      {
        id: 5,
        name: 'Torneo de Charrería',
        date: '2025-12-08',
        time: '3:00 PM',
        location: 'Lienzo Charro',
        description: 'Competencia tradicional de charrería',
        image: 'https://images.unsplash.com/photo-1583147610176-cc1cb8d75a7d?w=800',
        category: 'sports'
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const categories = [
    { value: 'all', label: t.eventsPage.main.all },
    { value: 'gastronomy', label: t.eventsPage.main.categories.gastronomy },
    { value: 'cultural', label: t.eventsPage.main.categories.cultural },
    { value: 'sports', label: t.eventsPage.main.categories.sports }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-MX', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.eventsPage.main.title}</h1>
          <p className="text-xl text-orange-100 max-w-2xl">
            {t.eventsPage.main.subtitle}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.eventsPage.main.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {event.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t.eventsPage.main.featured}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{event.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={18} className="mr-2 text-orange-600" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock size={18} className="mr-2 text-orange-600" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin size={18} className="mr-2 text-orange-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {t.eventsPage.main.categories[event.category]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.eventsPage.main.noEventsFound}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;