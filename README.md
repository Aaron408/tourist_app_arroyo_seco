# Xi'oi Gourmet - Digital Gastronomic Tourism Platform

<div align="center">

**Preserving the Pame flavor of the Sierra Gorda**

[![License](https://img.shields.io/badge/license-Educational-blue.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)]()
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-18+-green.svg)](https://nodejs.org/)

</div>

---

## About the Project

**Xi'oi Gourmet** is the first digital platform specialized in cultural gastronomic tourism in Arroyo Seco, Querétaro, connecting travelers with authentic culinary experiences from the Sierra Gorda, preserving and disseminating the gastronomic heritage of Pame culture.

**Xi'oi** (pronounced "shiói") means "Pame" in the native language, representing the union of cultural identity + gastronomy = **"The Pame flavor"**.

### Mission

To rescue, preserve, and disseminate the traditional gastronomy of Arroyo Seco through accessible technology, connecting tourists, cooks, and local residents on a modern platform that guarantees cultural authenticity and direct economic benefit to communities.

### Value Proposition

- **Authentic discovery without intermediaries** - Direct access to family inns and traditional cooks
- **100% offline functionality** - Access recipes and locations in areas with limited connectivity
- **Multilingual and inclusive** - Content in Spanish, English, and Pame
- **Immersive experiences** - Workshops with Pame grandmothers and cooks
- **Tourism with social purpose** - Every visit supports local families and preserves intangible heritage

---

## Project Architecture

This repository is a **monorepo** containing all components of the Xi'oi Gourmet platform:

```
xioi-gourmet/
├── pwa/              # Progressive web application (React + Vite)
├── mobile/           # Native mobile application (React Native)
├── backend/          # Backend with microservices
├── tests/            # Project test suite
└── README.md         # This file
```

### Project Modules

#### PWA (Progressive Web App)
**Status:** Operational

Modern and responsive web platform that works in desktop and mobile browsers. Main features:

- **Technologies:** React 19, Vite 7, Tailwind CSS 4, React Router 7, Zustand
- **Complete offline functionality** via Service Workers
- **Admin panel** with authentication and content management
- **Tourist landing page** with recipe catalog, restaurants, and events
- **Multilingual:** Spanish, English, and Pame
- **Installable** as an application on devices

[See complete PWA documentation](./pwa/README.md)

#### Mobile (Native Mobile Application)
**Status:** In development

Native application for Android and iOS with optimized experience for mobile devices.

- **Technology:** React Native + Expo
- **Planned features:**
  - Native and fluid experience
  - Push notifications
  - Camera access to scan restaurant QR codes
  - Advanced geolocation
  - Robust offline mode
- **Distribution:** Google Play Store (Android) and App Store (iOS)

[See Mobile documentation](./mobile/README.md)

#### Backend (Microservices)
**Status:** In planning

Backend based on microservices architecture for scalability and maintainability.

- **Architecture:** Independent microservices
- **Planned technologies:**
  - Node.js + Express/NestJS
  - PostgreSQL for structured data
  - Redis for cache
  - Docker for containerization
  - API Gateway for routing
- **Main services:**
  - Authentication service (Auth)
  - Recipes and gastronomy service
  - Locations and maps service
  - Events and workshops service
  - Translations service
  - Notifications service

[See Backend documentation](./backend/README.md)

#### Tests (Test Suite)
**Status:** In planning

Centralized folder for all automated project tests.

- **Planned test types:**
  - Unit tests (Jest)
  - Integration (Jest + Supertest)
  - End-to-End (Cypress/Playwright)
  - Performance (Lighthouse CI)
- **Target coverage:** >80% of code
- **CI/CD:** Integration with GitHub Actions

[See Tests documentation](./tests/README.md)

---

## Quick Start

### Global Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **PostgreSQL** 14+ (for backend)
- **Git**

### Complete Installation

```bash
# Clone the repository
git clone https://github.com/your-username/xioi-gourmet.git
cd xioi-gourmet

# Install dependencies for available modules
cd pwa && npm install && cd ..
cd mobile && npm install && cd ..

# Backend and tests still in development
```

### Execution by Module

#### PWA (Web Application) - Available
```bash
cd pwa
npm run dev
# Access at: http://localhost:5173
```

#### Mobile (Mobile Application) - In development
```bash
cd mobile
npm start
# Use Expo Go to view on your device
```

#### Backend - 🚧 Coming soon
```bash
# In development - documentation pending
```

---

## Tech Stack

### PWA (Web Frontend)
- **React 19.1.1** - Latest generation UI library
- **Vite 7.1.7** - Ultra-fast build tool
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **React Router 7.9.4** - SPA navigation
- **Zustand 5.0.8** - Minimalist state management
- **Service Workers** - Offline functionality

### Mobile (Native Application)
- **React Native** - Cross-platform framework
- **Expo** - Development toolchain
- *(Complete stack in definition)*

### Backend (Microservices)
- **Node.js 18+** - JavaScript runtime
- **Express/NestJS** - Frameworks (to be defined)
- **PostgreSQL 14+** - Main database
- **Redis** - Cache and sessions
- **Docker** - Containerization
- **JWT** - Authentication
- *(Architecture in design)*

### Testing
- **Jest** - Testing framework (planned)
- **Cypress/Playwright** - E2E testing (planned)
- **Supertest** - API testing (planned)

### DevOps & Hosting
- **IONOS VPS** - Main hosting
- **Vercel** - PWA/Landing hosting
- **Google Play Store** - Android distribution
- **App Store** - iOS distribution (planned)
- **Don Dominio** - Domain registration

---

## Documentation by Module

Each module has its own detailed documentation:

- **[PWA - Documentation](./pwa/README.md)** *Available*
  - Installation and configuration
  - Project structure
  - Development guide
  - Authentication and protected routes

- **[Mobile - Documentation](./mobile/README.md)** *In development*
  - Expo configuration
  - Native components
  - *(Documentation in progress)*

- **[Backend - Documentation](./backend/README.md)** *Coming soon*
  - Microservices architecture
  - API endpoints
  - *(In planning)*

- **[Tests - Documentation](./tests/README.md)** *Coming soon*
  - Testing strategy
  - Testing guide
  - *(In planning)*

---

## Main Features

### For Tourists
- Traditional Pame recipe catalog with cultural history
- Local restaurant and inn directory (Flavor Route)
- Interactive map with offline geolocation
- Native ingredients database with properties
- Documented ancestral culinary techniques
- Booking of experiential gastronomic workshops
- Multilingual content (ES/EN/Pame)

### For Administrators
- Protected control panel with authentication
- Dashboard with usage and popularity metrics
- Complete CRUD for recipes, ingredients, and locations
- Cultural events and workshops management
- Centralized translation system
- Feedback and reviews module
- User and permissions administration

---

## Business Model

### Revenue Sources

| Source | Type | Estimated % | Purpose |
|--------|------|------------|---------|
| Municipal Government | Public | 70-80% | Base operation |
| Workshop Donations | Community | 5-10% | Local reinvestment |
| Paid Mentions | Regulated commercial | 10-15% | Tech improvements |
| Sponsorships | Extraordinary | 5-10% | Special projects |

### User Segments

1. **National Tourists** (60%) - Main consumers
2. **International Tourists** (25%) - Need English content
3. **Researchers/Students** (15%) - Rigorous documentation

---

## Development Team

**Technological University of Querétaro - IDGS10**

| Name | Role |
|------|------|
| Angel Eduardo Anaya Becerril | Full-stack Developer |
| Timoteo Cruz Hernández | Backend Developer |
| Carlos Flores Carranza | Frontend Developer |
| Victor Manuel Rangel Mejía | Mobile Developer |
| Aaron Reyes Ruiz | UI/UX Designer |
| Eduardo Daniel Rodríguez | QA Engineer |
| Mauricio Martínez Rodríguez | DevOps Engineer |

**Academic Advisor:** Josue Francisco Lopez Lopez  
**Institution:** Technological University of Querétaro (UTEQ)

---

## Key Partners

- **Municipal Government of Arroyo Seco** - Main client and funding
- **Secretary of Tourism of Querétaro** - Regional promotion
- **Technological University of Querétaro** - Technological development
- **Pame Indigenous Communities** - Cultural validation and authentic content
- **Local Restaurant Association** - Business directory

---

## Roadmap

### Phase 1 - MVP (Current - Q1 2025)
- [x] **Operational PWA** with complete offline functionality
- [x] Basic traditional recipe catalog
- [x] Restaurant and location directory
- [x] Admin panel with authentication
- [x] Multilingual content (ES/EN)
- [x] Complete tourist landing page
- [ ] Mobile: Base structure and initial components

### Phase 2 - Expansion (Q2 2025)
- [ ] **Backend:** Microservices architecture design
- [ ] **Backend:** Implementation of core services (Auth, Recipes, Locations)
- [ ] **Mobile:** Functional app in Expo with main features
- [ ] **PWA:** Cultural workshop booking system
- [ ] **Tests:** Basic suite of unit and integration tests
- [ ] Integration between PWA, Mobile, and Backend

### Phase 3 - Optimization (Q3 2025)
- [ ] **Backend:** All microservices operational and documented
- [ ] **Mobile:** Publication on Google Play Store
- [ ] **PWA:** Recommendation system with ML
- [ ] **Tests:** >80% coverage and complete E2E tests
- [ ] Push notifications on both platforms
- [ ] Analytics dashboard and advanced metrics

### Phase 4 - Scale (Q4 2025)
- [ ] Mobile publication on App Store (iOS)
- [ ] Payment and monetization system
- [ ] Public API for third parties
- [ ] Expansion to other Sierra Gorda municipalities

---

## Testing

```bash
# PWA - Available tests
cd pwa && npm run test

# Mobile - In development
cd mobile && npm run test

# Backend - Coming soon
# cd backend && npm run test

# E2E Tests - Coming soon
# cd tests && npm run test:e2e
```

**Current status:**
- PWA: Linter configured, unit tests in planning
- Mobile: Testing strategy in definition
- Backend: Tests pending (architecture first)
- E2E: Complete suite planned for Phase 3

---

## Deployment

### Deployment Status

| Platform | URL/Store | Status |
|----------|-----------|--------|
| **PWA Production** | [xioigourmet.com](https://xioigourmet.com) | In development |
| **PWA Staging** | Vercel Preview | Active |
| **Backend API** | IONOS VPS | Pending |
| **Mobile Android** | Google Play Store | Pending |
| **Mobile iOS** | App Store | Pending |

### Deployment Configuration

#### PWA
- **Production:** Vercel (custom domain)
- **Build:** `npm run build` in `/pwa` directory
- **Environment variables:** Configured in Vercel Dashboard

#### Mobile
- **Android:** Google Play Console (in preparation)
- **iOS:** App Store Connect (planned for Q3 2025)

#### Backend
- **Hosting:** IONOS VPS with Docker
- **API Documentation:** Swagger UI (when available)

*Detailed deployment instructions available in each module's README.*

---

## License

This project is developed for educational purposes and public service for the Municipal Government of Arroyo Seco, Querétaro. All rights reserved.

---

## Acknowledgments

We thank the Pame indigenous communities, traditional cooks, municipal government of Arroyo Seco, UTEQ, and all who contribute to preserving the gastronomic heritage of the Sierra Gorda.

---

<div align="center">

**Made with ❤️ to preserve Pame flavor**

*"Xi'oi Gourmet - Where every dish tells a story"*

</div>