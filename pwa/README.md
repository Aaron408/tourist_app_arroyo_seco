# Xi'oi Gourmet - PWA 🍽️

> Progressive web platform for gastronomic and cultural tourism in Arroyo Seco, Querétaro

## 📖 Description

Xi'oi Gourmet is a progressive web application (PWA) that connects travelers with authentic culinary experiences from the Sierra Gorda, preserving and disseminating the gastronomic heritage of the Pame culture. The platform offers access to traditional recipes, local restaurant directory, native ingredients, ancestral culinary techniques, and cultural events.

**Xi'oi** means "Pame" in the native language - uniting identity + food = "The Pame flavor".

## ✨ Key Features

- 🌐 **Complete Offline Functionality** - Access recipes, locations, and cultural information without connection
- 🗺️ **Interactive Flavor Route** - Geolocated maps of restaurants and traditional inns
- 🌍 **Multilingual** - Content in Spanish, English, and Pame
- 👨‍🍳 **Traditional Recipe Catalog** - Documented with cultural rigor and validated by local communities
- 📚 **Native Ingredients Database** - With properties, history, and traditional uses
- 🎓 **Cultural Workshops** - Book and participate in immersive culinary experiences
- 🔍 **Smart Search** - Find dishes by ingredients, techniques, or region
- 📱 **Responsive Design** - Adapted for mobile, tablets, and desktop

## 🛠️ Technologies

- **React 19.1.1** - User interface library
- **Vite 7.1.7** - Fast build tool
- **React Router DOM 7.9.4** - SPA navigation
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Zustand 5.0.8** - Lightweight state management
- **PWA** - Service Workers for offline functionality

## 🚀 Installation and Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/xioi-gourmet.git

# Navigate to PWA directory
cd xioi-gourmet/pwa

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server at http://localhost:5173
npm run build    # Build application for production
npm run preview  # Preview production build
npm run lint     # Run linter to check code
```

## 📁 Project Structure

```
pwa/
├── src/
│   ├── admin/              # Administration module
│   │   ├── components/     # Admin panel components
│   │   ├── contexts/       # Authentication contexts
│   │   ├── hooks/          # Custom hooks for admin logic
│   │   ├── layouts/        # Administrative layouts
│   │   ├── pages/          # Panel pages
│   │   ├── routes/         # Protected routes configuration
│   │   ├── stores/         # Global states (Zustand)
│   │   └── utils/          # Utilities and constants
│   ├── common/             # Shared resources
│   │   ├── components/     # Reusable components
│   │   ├── stores/         # Shared states
│   │   └── utils/          # Helpers and common functions
│   ├── landing/            # Public/tourist module
│   │   ├── components/     # Landing components
│   │   ├── layouts/        # Public layouts
│   │   ├── hooks/          # Custom hooks for landing module
│   │   ├── pages/          # Tourist pages
│   │   │   ├── events/     # Workshops, guided tours
│   │   │   ├── gastronomy/ # Recipes, ingredients
│   │   │   ├── home/       # Home page
│   │   │   └── locations/  # Maps, restaurants
│   │   ├── routes/         # Public routes
│   │   ├── stores/         # Landing states
│   │   └── utils/          # Landing utilities
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static files
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 🎨 Color Palette

- **Primary**: Amber/Orange (#D97706, #EA580C) - Evokes gastronomic warmth
- **Secondary**: Gray (#6B7280, #1F2937) - Elegance and readability
- **Accents**: Green/Blue for interactive elements

## 🔐 Authentication (Admin Panel)

The administration panel is protected with authentication via Context API:

**Test credentials:**
- Email: `admin@arroyoseco.com`
- Password: `admin123`

## 🌍 Internationalization

The application supports three languages via `languageStore`:
- 🇲🇽 Spanish (es)
- 🇺🇸 English (en)  
- 🏔️ Pame (pame) - Native language

## 📱 PWA Features

- ✅ Installable on devices
- ✅ Works offline via Service Workers
- ✅ Automatic background updates
- ✅ Push notifications (planned)

## 🤝 Contribution

This project is part of a government initiative of the Municipality of Arroyo Seco and the Technological University of Querétaro (UTEQ).

## 👥 Development Team

- Angel Eduardo Anaya Becerril
- Timoteo Cruz Hernández
- Carlos Flores Carranza
- Victor Manuel Rangel Mejía
- Aaron Reyes Ruiz
- Eduardo Daniel Rodríguez Rodríguez
- Mauricio Martínez Rodríguez

**Group:** IDGS10  
**Institution:** Technological University of Querétaro

## 📄 License

This project is developed for educational purposes and public service for the Municipal Government of Arroyo Seco, Querétaro.

## 📞 Contact

- **Website:** xioigourmet.com
- **Email:** info@arroyoseco.com
- **Location:** Arroyo Seco, Querétaro, Mexico

---

Made with ❤️ to preserve Pame gastronomic heritage