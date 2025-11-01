# 🎓 Workshops Feature - Architecture & Data Flow

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Tab Navigation                                          │
│  ├── Home                                                │
│  ├── Recipes                                             │
│  ├── Restaurants                                         │
│  ├── Explore                                             │
│  └── 🆕 Workshops ◄─────────────────────────────────┐   │
│                                                    │   │
│      Workshops Screen                              │   │
│      ├── Filter Chips (All/In-person/Online)      │   │
│      ├── Workshop List (FlatList)                  │   │
│      │  ├── WorkshopCard 1                         │   │
│      │  ├── WorkshopCard 2                         │   │
│      │  └── WorkshopCard N                         │   │
│      └── ⓘ No Workshops / Loading / Error          │   │
│           │                                        │   │
│           ↓ (onPress)                              │   │
│      Workshop Detail Screen                        │   │
│      ├── 🖼️  Header Image + Type Badge             │   │
│      ├── 📝 Title & Description                    │   │
│      ├── 📅 Date & Location Info                   │   │
│      ├── 👥 Capacity Bar                           │   │
│      ├── 🎥 Video Player (if available)            │   │
│      ├── 📋 Full Details                           │   │
│      └── ✍️  Inscribe Button (TODO)                 │   │
│                                                    │   │
└────────────────────────────────────────────────────────┘
                      │
                      │ API Calls
                      ↓
┌─────────────────────────────────────────────────────────┐
│              SERVICE LAYER                               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  workshopService.ts                                      │
│  ├── getAllWorkshops()                                   │
│  ├── getWorkshopById(id)                                 │
│  ├── hasAvailableVideo()                                 │
│  ├── getAvailableVideoUrl()                              │
│  ├── formatDateRange()                                   │
│  ├── getWorkshopTypeLabel()                              │
│  └── getWorkshopTypeColor()                              │
│                                                          │
└────────────────────────────────────────────────────────┘
                      │
                      │ HTTP Requests
                      ↓
┌─────────────────────────────────────────────────────────┐
│              API LAYER (Axios)                           │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  api.ts (configured with auth interceptors)             │
│  └── GET /workshopMS/api/Workshop/all                   │
│  └── GET /workshopMS/api/Workshop/{id}                  │
│                                                          │
└────────────────────────────────────────────────────────┘
                      │
                      │ HTTPS/REST
                      ↓
┌─────────────────────────────────────────────────────────┐
│            BACKEND API SERVER                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  vps-master.duckdns.org/workshopMS                       │
│  ├── /api/Workshop/all ────► WorkshopsResponse[]         │
│  └── /api/Workshop/{id} ───► WorkshopDetailResponse     │
│                                                          │
│  Response includes:                                      │
│  ├── Workshop metadata                                   │
│  ├── Image URLs (thumbnails + full)                      │
│  └── Video URLs (with availability dates)                │
│                                                          │
└─────────────────────────────────────────────────────────┘
                      │
                      │ Media Files
                      ↓
┌─────────────────────────────────────────────────────────┐
│         MEDIA SERVER (Images & Videos)                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  vps-master.duckdns.org/media/                           │
│  ├── workshops/*.jpg (thumbnails)                        │
│  └── videos/*.mp4 (workshop videos)                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Sequence

### 1️⃣ Loading Workshops List

```
App Mounted
    ↓
[useEffect] loadWorkshops()
    ↓
setLoading(true)
    ↓
workshopService.getAllWorkshops()
    ↓
api.get('/workshopMS/api/Workshop/all')
    ↓
Backend returns WorkshopsResponse
    ↓
setWorkshops(data)
setLoading(false)
    ↓
FlatList renders WorkshopCard components
    ↓
User sees: List of workshops with images, capacity, dates
```

### 2️⃣ Loading Workshop Details

```
User taps workshop card
    ↓
router.push({ pathname: '/screens/workshop-detail/[id]', params: { id } })
    ↓
Detail screen loads
    ↓
[useEffect] loadWorkshopDetails()
    ↓
setLoading(true)
    ↓
workshopService.getWorkshopById(id)
    ↓
api.get(`/workshopMS/api/Workshop/{id}`)
    ↓
Backend returns WorkshopDetailResponse
    ↓
setWorkshop(data)
setLoading(false)
    ↓
Screen renders with:
├── Full image
├── Complete description
├── Video player (if video available)
└── Inscribe button
```

### 3️⃣ Video Availability Check

```
Workshop loaded (data.videos = [...])
    ↓
Video component checks: hasAvailableVideo(workshop)
    ↓
Loop through videos array
    ↓
Check each video.isAvailable flag
    ↓
If true:
├── Show "▶️ Ver" button
├── Store videoUrl in state
└── Enable video player toggle
    ↓
If false:
└── Hide video section
```

### 4️⃣ Filtering Workshops

```
Filter chip pressed (e.g., "Presencial")
    ↓
setFilter({ type: 'in_person' })
    ↓
filteredWorkshops = workshops.filter(
  w => filter.type === 'all' || w.workshopType === filter.type
)
    ↓
FlatList re-renders with filtered data
    ↓
User sees only matching workshops
```

---

## 💾 State Management

### Workshops Screen
```typescript
const [workshops, setWorkshops] = useState<Workshop[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [filter, setFilter] = useState({ type: 'all' })
```

### Workshop Detail Screen
```typescript
const [workshop, setWorkshop] = useState<WorkshopDetail | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [showVideo, setShowVideo] = useState(false)
```

---

## 📱 Component Hierarchy

```
App
├── (tabs) Layout
│   ├── index (Home)
│   ├── recipes (Recipes)
│   ├── restaurants (Restaurants)
│   ├── explore (Explore)
│   └── workshops ◄─────────────────────┐
│       ├── Header                       │
│       │   ├── Title "🎓 Talleres"     │
│       │   ├── Subtitle                │
│       │   ├── FilterChip x 4           │
│       │   └── Count display            │
│       ├── FlatList                     │
│       │   ├── WorkshopCard             │
│       │   │   ├── Image                │
│       │   │   ├── TypeBadge            │
│       │   │   ├── Title                │
│       │   │   ├── Description          │
│       │   │   ├── DateInfo             │
│       │   │   ├── CapacityBar          │
│       │   │   ├── CapacityInfo         │
│       │   │   └── IconBadges           │
│       │   └── [repeat for each]        │
│       └── ListEmpty / ListError        │
└── screens
    └── workshop-detail/[id]             │
        ├── Header                       │
        │   ├── Image + TypeBadge        │
        │   └── BackButton               │
        ├── ScrollView                   │
        │   ├── Title & Code             │
        │   ├── Description              │
        │   ├── DateInfo                 │
        │   ├── LocationInfo             │
        │   ├── CapacitySection          │
        │   ├── VideoSection             │
        │   │   ├── Title                │
        │   │   ├── ToggleButton         │
        │   │   └── VideoPlayer          │
        │   ├── FullDescription          │
        │   ├── Requirements             │
        │   └── Objectives               │
        └── FixedButton                  │
            └── InscribeButton            │
```

---

## 🎨 Style & Theme System

```
Colors System
├── Primary (Main action)
├── Secondary (Supporting)
├── Tertiary (Accent)
├── Background
├── Surface
├── Outline
└── Error

Workshop Type Colors (Override)
├── In-person: #FF6B6B (Red)
├── Online: #4ECDC4 (Teal)
└── Hybrid: #FFE66D (Yellow)

Spacing Scale
├── xs: 4px
├── sm: 8px
├── md: 16px
├── lg: 24px
└── xl: 32px

Border Radius
├── sm: 8px
├── md: 12px
├── lg: 16px
└── full: 9999px
```

---

## 🔐 Error Handling

```
Network Request
    ├─ Success (200)
    │   ├── Parse data
    │   ├── Validate types
    │   └── Update state
    │
    ├─ Error (401)
    │   └── Clear auth tokens
    │
    ├─ Error (4xx/5xx)
    │   ├── Log error
    │   ├── Show error message
    │   └── Display retry button
    │
    └─ Timeout/Network
        ├── Show error state
        ├── Enable retry
        └── Continue app normally
```

---

## 📊 Type Flow

```
API Response (JSON)
    ↓
TypeScript Types
    ├── WorkshopsResponse
    │   ├── success: boolean
    │   ├── totalCount: number
    │   └── data: Workshop[]
    │
    └── WorkshopDetailResponse
        ├── success: boolean
        ├── data: WorkshopDetail
        │   ├── Workshop (base)
        │   ├── images: WorkshopImage[]
        │   └── videos: WorkshopVideo[]
        └── language: string

Component Props
    ├── <WorkshopCard workshop={Workshop} />
    └── Detail Screen uses WorkshopDetail

State Updates
    ├── setWorkshops(Workshop[])
    ├── setWorkshop(WorkshopDetail)
    └── UI Auto-renders with proper types
```

---

## 🚀 Performance Considerations

```
Optimization Strategy
├── Lazy Loading (FlatList)
├── Image Caching (Expo Image)
├── Memoization (React.memo for cards)
├── Conditional Rendering (video, details)
└── Error Boundaries (try-catch blocks)

Video Performance
├── Check availability first (no auto-play)
├── Lazy load video player
├── Proper memory cleanup
└── Support resume/pause
```

---

## 🔗 Integration Points

```
Future Features
├── Enrollment API
│   └── POST /workshopMS/api/Workshop/{id}/enroll
│
├── User Workshops
│   └── GET /workshopMS/api/User/{userId}/workshops
│
├── Ratings/Reviews
│   └── POST /workshopMS/api/Workshop/{id}/review
│
└── Notifications
    └── Push when enrollment closes
```

---

## 📈 Scalability

The architecture supports:
- ✅ Hundreds of workshops
- ✅ Multiple images per workshop
- ✅ Long videos with buffering
- ✅ Complex filters
- ✅ Pagination (with offset/limit)
- ✅ Search functionality
- ✅ Sorting (by date, popularity, etc.)
- ✅ User authentication levels
- ✅ Multi-language support

All without major refactoring! 🎉
