import { Link } from 'react-router-dom';

const FeatureCard = ({ 
  to, 
  bgGradient, 
  iconGradient, 
  icon, 
  title, 
  description, 
  linkText, 
  linkColor 
}) => {
  return (
    <Link to={to} className="group h-full">
      <div className={`bg-gradient-to-br ${bgGradient} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 h-full flex flex-col justify-between`}>
        <div>
          <div className={`w-16 h-16 bg-gradient-to-br ${iconGradient} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <span className="text-3xl">{icon}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h3>
          <p className="text-gray-600 mb-4">
            {description}
          </p>
        </div>
        <span className={`${linkColor} font-semibold group-hover:underline mt-4`}>
          {linkText}
        </span>
      </div>
    </Link>
  );
};

export default FeatureCard;