import { useNavigate } from 'react-router-dom';

const GastronomyCard = ({
  id,
  image,
  title,
  description,
  badges = [],
  meta = [],
  buttonText,
  detailPath,
  gradientColor = 'orange'
}) => {
  const navigate = useNavigate();

  const gradientColors = {
    orange: 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
    green: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    purple: 'from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600',
    amber: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  };

  const gradient = gradientColors[gradientColor] || gradientColors.orange;

  // Fallback image si no hay banner_image
  const displayImage = image || 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800&q=80';

  const handleClick = () => {
    if (detailPath) {
      navigate(detailPath);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {badges.map((badge, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                {badge.icon && <badge.icon className="w-3 h-3" />}
                <span className="text-xs font-semibold text-gray-900">{badge.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        {meta.length > 0 && (
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 flex-wrap">
            {meta.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        <button
          className={`w-full bg-gradient-to-r ${gradient} text-white py-2 rounded-lg font-medium transition-all shadow-md`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default GastronomyCard;
