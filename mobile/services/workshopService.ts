import api from './api';

/**
 * Workshop Types
 */
export interface WorkshopImage {
  id: number;
  url: string;
  displayOrder: number;
  isPrimary: boolean;
}

export interface WorkshopVideo {
  id: number;
  url: string;
  availableFrom: string;
  availableUntil: string;
  isAvailable: boolean;
}

export interface Workshop {
  id: number;
  code: string;
  workshopType: 'in_person' | 'online' | 'hybrid';
  title: string;
  shortDescription: string;
  description?: string;
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

export interface WorkshopDetail extends Workshop {
  locationAddress?: string;
  locationCoordinates?: {
    latitude: number;
    longitude: number;
  } | null;
  onlineMeetingUrl?: string;
  onlineMeetingPlatform?: string;
  createdBy?: string | null;
  instructorId?: string | null;
  requirements?: string | null;
  objectives?: string | null;
  images?: WorkshopImage[];
  videos?: WorkshopVideo[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkshopsResponse {
  success: boolean;
  totalCount: number;
  data: Workshop[];
  language: string;
}

export interface WorkshopDetailResponse {
  success: boolean;
  data: WorkshopDetail;
  language: string;
}

/**
 * Workshop API Service
 */
const WORKSHOP_BASE_URL = 'https://vps-master.duckdns.org/workshopMS/api/Workshop';

export const workshopService = {
  /**
   * Fetch all workshops
   */
  async getAllWorkshops(): Promise<Workshop[]> {
    try {
      const response = await api.get<WorkshopsResponse>(`${WORKSHOP_BASE_URL}/all`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch workshops');
    } catch (error) {
      console.error('❌ Error fetching workshops:', error);
      throw error;
    }
  },

  /**
   * Fetch workshop by ID
   */
  async getWorkshopById(id: number): Promise<WorkshopDetail> {
    try {
      const response = await api.get<WorkshopDetailResponse>(`${WORKSHOP_BASE_URL}/${id}`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch workshop details');
    } catch (error) {
      console.error(`❌ Error fetching workshop ${id}:`, error);
      throw error;
    }
  },

  /**
   * Check if workshop has available video
   */
  hasAvailableVideo(workshop: WorkshopDetail | Workshop): boolean {
    if ('videos' in workshop && workshop.videos && workshop.videos.length > 0) {
      return workshop.videos.some(video => video.isAvailable);
    }
    return false;
  },

  /**
   * Get available video URL if exists
   */
  getAvailableVideoUrl(workshop: WorkshopDetail): string | null {
    if ('videos' in workshop && workshop.videos && workshop.videos.length > 0) {
      const availableVideo = workshop.videos.find(video => video.isAvailable);
      return availableVideo?.url || null;
    }
    return null;
  },

  /**
   * Format workshop date range
   */
  formatDateRange(startDate: string, endDate: string): string {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      const dateOptions: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      
      const startStr = start.toLocaleDateString('es-MX', dateOptions);
      const endStr = end.toLocaleDateString('es-MX', dateOptions);
      
      return `${startStr} - ${endStr}`;
    } catch {
      return 'Fecha no disponible';
    }
  },

  /**
   * Get workshop type label
   */
  getWorkshopTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'in_person': 'Presencial',
      'online': 'En línea',
      'hybrid': 'Híbrido'
    };
    return labels[type] || type;
  },

  /**
   * Get workshop type color (for UI)
   */
  getWorkshopTypeColor(type: string): string {
    const colors: Record<string, string> = {
      'in_person': '#FF6B6B',
      'online': '#4ECDC4',
      'hybrid': '#FFE66D'
    };
    return colors[type] || '#999999';
  },
};

export default workshopService;
