import { Calendar, MapPin, Clock, Users, Utensils, Award, Info } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

const FlavorRoute = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();

  const event = {
    name: t.eventsPage.flavorRoute.title,
    slogan: t.eventsPage.flavorRoute.subtitle,
    date: '2025-11-15',
    time: '10:00 AM - 8:00 PM',
    location: 'Centro Histórico de Arroyo Seco',
    description: t.eventsPage.flavorRoute.description,
    mainImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    price: t.eventsPage.flavorRoute.freeEntry,
    
    highlights: [
      {
        id: 1,
        title: 'Más de 40 stands gastronómicos',
        description: 'Prueba la auténtica cocina tradicional de Arroyo Seco',
        icon: Utensils
      },
      {
        id: 2,
        title: 'Concurso de platillos',
        description: 'Los mejores cocineros compiten por el reconocimiento',
        icon: Award
      },
      {
        id: 3,
        title: 'Música en vivo',
        description: 'Grupos tradicionales y bandas locales',
        icon: Users
      }
    ],

    route: [
      {
        id: 1,
        stop: 'Plaza Principal',
        schedule: '10:00 AM',
        description: 'Inauguración del evento y degustación de gorditas',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600'
      },
      {
        id: 2,
        stop: 'Calle Hidalgo',
        schedule: '12:00 PM',
        description: 'Antojitos tradicionales y bebidas típicas',
        image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600'
      },
      {
        id: 3,
        stop: 'Jardín Municipal',
        schedule: '2:00 PM',
        description: 'Postres regionales y café de olla',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600'
      },
      {
        id: 4,
        stop: 'Parroquia',
        schedule: '4:00 PM',
        description: 'Platillos ceremoniales y dulces típicos',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600'
      }
    ],

    practicalInfo: [
      {
        title: 'Estacionamiento',
        description: 'Disponible en la explanada municipal'
      },
      {
        title: 'Accesibilidad',
        description: 'Ruta accesible para personas con movilidad reducida'
      },
      {
        title: 'Recomendaciones',
        description: 'Llevar efectivo, usar calzado cómodo y protector solar'
      },
      {
        title: 'Mascotas',
        description: 'Se permiten mascotas con correa'
      }
    ]
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-MX', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={event.mainImage} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{event.name}</h1>
            <p className="text-2xl text-orange-300 max-w-3xl">{event.slogan}</p>
          </div>
        </div>
      </div>

      {/* General Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 -mt-20 relative z-10 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="text-orange-600" size={32} />
              <div>
                <p className="text-sm text-gray-500">{t.eventsPage.main.date}</p>
                <p className="font-semibold">{formatDate(event.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="text-orange-600" size={32} />
              <div>
                <p className="text-sm text-gray-500">{t.eventsPage.main.schedule}</p>
                <p className="font-semibold">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-orange-600" size={32} />
              <div>
                <p className="text-sm text-gray-500">{t.eventsPage.main.location}</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Info className="text-orange-600" size={32} />
              <div>
                <p className="text-sm text-gray-500">{t.eventsPage.main.price}</p>
                <p className="font-semibold text-green-600">{event.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.eventsPage.flavorRoute.aboutEvent}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{event.description}</p>
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.eventsPage.flavorRoute.highlights}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {event.highlights.map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    <IconComponent className="text-orange-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Route */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.eventsPage.flavorRoute.routeTitle}</h2>
          <div className="space-y-8">
            {event.route.map((stop, index) => (
              <div key={stop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={stop.image} 
                      alt={stop.stop}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{stop.stop}</h3>
                        <p className="text-orange-600 font-semibold">{stop.schedule}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg">{stop.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Information */}
        <div className="bg-orange-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.eventsPage.flavorRoute.practicalInfo}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {event.practicalInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-8">
            <h3 className="text-3xl font-bold mb-4">{t.eventsPage.flavorRoute.dontMissIt}</h3>
            <p className="text-xl text-orange-100 mb-6">
              {t.eventsPage.flavorRoute.uniqueEvent}
            </p>
            <p className="text-lg">
              {t.eventsPage.flavorRoute.shareEvent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorRoute;