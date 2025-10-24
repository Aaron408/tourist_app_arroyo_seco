import { Search } from 'lucide-react';

const Filters = ({
  searchQuery,
  setSearchQuery,
  searchPlaceholder = 'Buscar...',
  selectedFilter,
  setSelectedFilter,
  filters = [],
  filterLabels = {},
  allLabel = 'Todos',
  primaryColor = 'orange',
  showSearch = true,
  showFilters = true,
}) => {
  const colorClasses = {
    orange: {
      focus: 'focus:border-orange-500',
      active: 'bg-orange-500 text-white shadow-lg',
      hover: 'hover:bg-orange-600',
    },
    green: {
      focus: 'focus:border-green-500',
      active: 'bg-green-500 text-white shadow-lg',
      hover: 'hover:bg-green-600',
    },
    purple: {
      focus: 'focus:border-purple-500',
      active: 'bg-purple-500 text-white shadow-lg',
      hover: 'hover:bg-purple-600',
    },
    amber: {
      focus: 'focus:border-amber-500',
      active: 'bg-amber-500 text-white shadow-lg',
      hover: 'hover:bg-amber-600',
    },
    blue: {
      focus: 'focus:border-blue-500',
      active: 'bg-blue-500 text-white shadow-lg',
      hover: 'hover:bg-blue-600',
    },
    red: {
      focus: 'focus:border-red-500',
      active: 'bg-red-500 text-white shadow-lg',
      hover: 'hover:bg-red-600',
    },
  };

  const colors = colorClasses[primaryColor] || colorClasses.orange;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          {showSearch && (
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl ${colors.focus} focus:outline-none transition-colors`}
              />
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedFilter(null)}
                className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedFilter === null
                    ? colors.active
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {allLabel}
              </button>

              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    selectedFilter === filter
                      ? colors.active
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterLabels[filter] || filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Filters;