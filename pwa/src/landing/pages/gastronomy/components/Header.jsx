import { ChefHat } from 'lucide-react';

const Header = ({ 
  title, 
  subtitle, 
  icon: Icon = ChefHat,
  gradientFrom = 'from-orange-600',
  gradientTo = 'to-red-600'
}) => {
  return (
    <section className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Icon className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;