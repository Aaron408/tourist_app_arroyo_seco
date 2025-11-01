# Workshops Feature

## Overview
The Workshops feature allows users to browse and view in-person, online, and hybrid workshops. Each workshop includes detailed information, video content (when available), and an inscription button.

## Components

### `WorkshopCard` (`components/workshop-card.tsx`)
A reusable card component that displays:
- Workshop thumbnail image with placeholder
- Workshop type badge (Presencial/En línea/Híbrido)
- Capacity status (available spots or full badge)
- Title and short description
- Date and time information
- Capacity progress bar
- Feature badges (online, hybrid, donations)

**Usage:**
```tsx
<WorkshopCard
  workshop={workshop}
  onPress={() => handleWorkshopPress(workshop.id)}
/>
```

### `WorkshopDetail` Screen (`app/screens/workshop-detail/[id].tsx`)
Detailed view of a single workshop with:
- Full-size workshop image
- Complete title, code, and description
- Date, location, and online meeting info
- Full capacity information with progress bar
- Video player (if video is available within availability window)
- Full description, requirements, and objectives
- Donation information
- **Inscribe button** (placeholder for future functionality)

### `Workshops` Screen (`app/(tabs)/workshops.tsx`)
Main workshops listing screen with:
- Dynamic workshop list using FlatList
- Filter chips (All, In-person, Online, Hybrid)
- Workshop count display
- Loading states
- Error handling with retry functionality
- Empty state messaging

## API Integration

### Workshop Service (`services/workshopService.ts`)
Provides methods for:
- `getAllWorkshops()` - Fetch all available workshops
- `getWorkshopById(id)` - Fetch detailed information for a specific workshop
- Helper methods for:
  - Checking video availability
  - Formatting date ranges
  - Getting workshop type labels and colors

### API Endpoints
- **Get all workshops:** `https://vps-master.duckdns.org/workshopMS/api/Workshop/all`
- **Get workshop details:** `https://vps-master.duckdns.org/workshopMS/api/Workshop/{id}`

## Type Definitions

### Workshop
Basic workshop information returned from the list endpoint:
```typescript
interface Workshop {
  id: number;
  code: string;
  workshopType: 'in_person' | 'online' | 'hybrid';
  title: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  status: 'published' | 'draft' | 'archived';
  currentAttendees: number;
  maxCapacity: number;
  allowsDonations: boolean;
  isFull: boolean;
  availableSpots: number;
  thumbnailUrl?: string;
  hasStarted?: boolean;
  hasEnded?: boolean;
}
```

### WorkshopDetail
Extended information returned from the detail endpoint, includes:
- `description` - Full description
- `locationAddress` - Physical location
- `onlineMeetingUrl` - URL for online workshops
- `images` - Array of workshop images
- `videos` - Array of workshop videos with availability windows
- `requirements` - Workshop prerequisites
- `objectives` - Learning objectives
- Additional metadata

### Video Object
```typescript
interface WorkshopVideo {
  id: number;
  url: string;
  availableFrom: string;  // ISO 8601 datetime
  availableUntil: string; // ISO 8601 datetime
  isAvailable: boolean;   // Based on current time
}
```

## Internationalization

Translations are provided for:
- Spanish (Mexico) - `i18n/es-MX/tabs/_layout/_layout.json`
- English (US) - `i18n/en-US/tabs/_layout/_layout.json`

Key: `Layout.tabs.workshops`

## Features

### Current Features
✅ Workshop listing with filtering by type  
✅ Workshop detail view with full information  
✅ Video player placeholder (when video available)  
✅ Capacity tracking with visual progress bar  
✅ Support for all workshop types (in-person, online, hybrid)  
✅ Responsive UI with proper theming  
✅ Internationalization support  

### Planned Features
🔄 **Inscription functionality** - Complete the inscription button logic  
🔄 **Video player integration** - Replace placeholder with actual video player (react-native-video or Expo Video)  
🔄 **Inscription management** - User's enrolled workshops list  
🔄 **Notifications** - Reminders for upcoming workshops  
🔄 **Ratings and reviews** - User feedback system  

## Color Scheme

Workshop types use distinct colors for easy identification:
- **In-person**: `#FF6B6B` (Red)
- **Online**: `#4ECDC4` (Teal)
- **Hybrid**: `#FFE66D` (Yellow)

## Styling

All components follow the app's theme system using:
- `Colors` from `constants/theme`
- `Spacing` for consistent padding/margins
- `BorderRadius` for rounded corners
- `Shadows` for depth and elevation
- `Typography` for text styles

## Error Handling

The feature includes comprehensive error handling:
- Network error messages with retry buttons
- Empty state when no workshops match filters
- Loading states with spinners
- Graceful fallbacks for missing images/videos

## Notes

- Workshop type labels are automatically translated based on user's language preference
- Video availability is automatically checked against current date/time
- The API base URL for workshops is separate from the main API and uses a different service endpoint
- All images use the API's HTTPS endpoints
