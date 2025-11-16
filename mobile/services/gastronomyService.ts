import api from './api';

/**
 * Translation Types
 */
export interface Translation {
  id: number;
  language_code: string;
  name: string;
  description: string;
}

/**
 * Recipe Types
 */
export interface RecipeTranslation {
  id: number;
  recipe_id: number;
  language_code: string;
  name: string;
  description: string;
}

export interface RecipeStepTranslation {
  id: number;
  step_id: number;
  language_code: string;
  description: string;
}

export interface RecipeStep {
  id: number;
  recipe_id: number;
  step_number: number;
  translations: RecipeStepTranslation[];
}

export interface RecipeIngredient {
  id: number;
  unit: string;
  RecipeIngredient: {
    quantity: string;
  };
  translations: Translation[];
}

export interface RecipeMultimedia {
  id: number;
  recipe_id: number;
  type: 'video' | 'image' | 'audio';
  url: string;
}

export interface Recipe {
  id: number;
  base_language: string;
  author_id: number | null;
  duration: number; // minutes
  difficulty: number; // 1-5
  banner_image: string | null;
  created_at: string;
  translations: RecipeTranslation[];
  steps?: RecipeStep[];
  ingredients?: RecipeIngredient[];
  multimedia?: RecipeMultimedia[];
}

export interface RecipesResponse {
  success: boolean;
  data: Recipe[];
  language?: string;
}

export interface RecipeDetailResponse {
  success: boolean;
  data: Recipe;
  language?: string;
}

/**
 * Ingredient Types
 */
export interface IngredientTranslation {
  id: number;
  ingredient_id: number;
  language_code: string;
  name: string;
  description: string;
}

export interface Ingredient {
  id: number;
  unit: string;
  harvest_start_month: number | null;
  harvest_start_day: number | null;
  harvest_end_month: number | null;
  harvest_end_day: number | null;
  banner_image: string | null;
  created_at: string;
  translations: IngredientTranslation[];
}

export interface IngredientsResponse {
  success: boolean;
  data: Ingredient[];
  language?: string;
}

export interface IngredientDetailResponse {
  success: boolean;
  data: Ingredient;
  language?: string;
}

/**
 * Technique Types
 */
export interface TechniqueTranslation {
  id: number;
  technique_id: number;
  language_code: string;
  name: string;
  description: string;
}

export interface Technique {
  id: number;
  banner_image: string | null;
  created_at: string;
  translations: TechniqueTranslation[];
}

export interface TechniquesResponse {
  success: boolean;
  data: Technique[];
  language?: string;
}

export interface TechniqueDetailResponse {
  success: boolean;
  data: Technique;
  language?: string;
}

/**
 * Tool Types
 */
export interface ToolTranslation {
  id: number;
  tool_id: number;
  language_code: string;
  name: string;
  description: string;
}

export interface Tool {
  id: number;
  banner_image: string | null;
  created_at: string;
  translations: ToolTranslation[];
}

export interface ToolsResponse {
  success: boolean;
  data: Tool[];
  language?: string;
}

export interface ToolDetailResponse {
  success: boolean;
  data: Tool;
  language?: string;
}

/**
 * Gastronomy API Service
 */
const GASTRONOMY_BASE_URL = 'https://vps-master.duckdns.org/gastronomyMS';

export const gastronomyService = {
  // ============ RECIPES ============

  /**
   * Fetch all recipes with optional language filter
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async getAllRecipes(language?: string): Promise<Recipe[]> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/recipes?language=${language}`
        : `${GASTRONOMY_BASE_URL}/recipes`;

      const response = await api.get<RecipesResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch recipes');
    } catch (error) {
      console.error('❌ Error fetching recipes:', error);
      throw error;
    }
  },

  /**
   * Fetch recipe by ID
   * @param id - Recipe ID
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async getRecipeById(id: number, language?: string): Promise<Recipe> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/recipes/${id}?language=${language}`
        : `${GASTRONOMY_BASE_URL}/recipes/${id}`;

      const response = await api.get<RecipeDetailResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch recipe details');
    } catch (error) {
      console.error(`❌ Error fetching recipe ${id}:`, error);
      throw error;
    }
  },

  /**
   * Search recipes by name
   * @param query - Search query
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async searchRecipes(query: string, language?: string): Promise<Recipe[]> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/recipes/search?q=${encodeURIComponent(query)}&language=${language}`
        : `${GASTRONOMY_BASE_URL}/recipes/search?q=${encodeURIComponent(query)}`;

      const response = await api.get<RecipesResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to search recipes');
    } catch (error) {
      console.error('❌ Error searching recipes:', error);
      throw error;
    }
  },

  // ============ INGREDIENTS ============

  /**
   * Fetch all ingredients with optional language filter
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async getAllIngredients(language?: string): Promise<Ingredient[]> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/ingredients?language=${language}`
        : `${GASTRONOMY_BASE_URL}/ingredients`;

      const response = await api.get<IngredientsResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch ingredients');
    } catch (error) {
      console.error('❌ Error fetching ingredients:', error);
      throw error;
    }
  },

  /**
   * Fetch ingredient by ID
   * @param id - Ingredient ID
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async getIngredientById(id: number, language?: string): Promise<Ingredient> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/ingredients/${id}?language=${language}`
        : `${GASTRONOMY_BASE_URL}/ingredients/${id}`;

      const response = await api.get<IngredientDetailResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch ingredient details');
    } catch (error) {
      console.error(`❌ Error fetching ingredient ${id}:`, error);
      throw error;
    }
  },

  // ============ TECHNIQUES ============

  /**
   * Fetch all culinary techniques with optional language filter
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async getAllTechniques(language?: string): Promise<Technique[]> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/techniques?language=${language}`
        : `${GASTRONOMY_BASE_URL}/techniques`;

      const response = await api.get<TechniquesResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch techniques');
    } catch (error) {
      console.error('❌ Error fetching techniques:', error);
      throw error;
    }
  },

  /**
   * Fetch technique by ID
   * @param id - Technique ID
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async getTechniqueById(id: number, language?: string): Promise<Technique> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/techniques/${id}?language=${language}`
        : `${GASTRONOMY_BASE_URL}/techniques/${id}`;

      const response = await api.get<TechniqueDetailResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch technique details');
    } catch (error) {
      console.error(`❌ Error fetching technique ${id}:`, error);
      throw error;
    }
  },

  // ============ TOOLS ============

  /**
   * Fetch all cooking tools with optional language filter
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async getAllTools(language?: string): Promise<Tool[]> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/tools?language=${language}`
        : `${GASTRONOMY_BASE_URL}/tools`;

      const response = await api.get<ToolsResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch tools');
    } catch (error) {
      console.error('❌ Error fetching tools:', error);
      throw error;
    }
  },

  /**
   * Fetch tool by ID
   * @param id - Tool ID
   * @param language - Language code (e.g., 'es-MX', 'en-US')
   */
  async getToolById(id: number, language?: string): Promise<Tool> {
    try {
      const url = language
        ? `${GASTRONOMY_BASE_URL}/tools/${id}?language=${language}`
        : `${GASTRONOMY_BASE_URL}/tools/${id}`;

      const response = await api.get<ToolDetailResponse>(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch tool details');
    } catch (error) {
      console.error(`❌ Error fetching tool ${id}:`, error);
      throw error;
    }
  },

  // ============ HELPER FUNCTIONS ============

  /**
   * Get translation in specific language from array of translations
   */
  getTranslation<T extends { language_code: string }>(
    translations: T[],
    language: string
  ): T | undefined {
    return translations.find(t => t.language_code === language);
  },

  /**
   * Get recipe difficulty label
   */
  getDifficultyLabel(difficulty: number): string {
    const labels: Record<number, string> = {
      1: 'Muy fácil',
      2: 'Fácil',
      3: 'Intermedio',
      4: 'Difícil',
      5: 'Muy difícil',
    };
    return labels[difficulty] || 'Desconocido';
  },

  /**
   * Get difficulty color (for UI)
   */
  getDifficultyColor(difficulty: number): string {
    const colors: Record<number, string> = {
      1: '#10B981', // green
      2: '#84CC16', // lime
      3: '#F59E0B', // amber
      4: '#F97316', // orange
      5: '#EF4444', // red
    };
    return colors[difficulty] || '#6B7280';
  },

  /**
   * Format duration in minutes to human-readable string
   */
  formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${mins}min`;
  },

  /**
   * Get harvest season text from months
   */
  getHarvestSeason(
    startMonth: number | null,
    endMonth: number | null
  ): string {
    if (!startMonth || !endMonth) {
      return 'Todo el año';
    }

    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    if (startMonth === endMonth) {
      return months[startMonth - 1];
    }

    return `${months[startMonth - 1]} - ${months[endMonth - 1]}`;
  },

  /**
   * Check if ingredient is in season
   */
  isInSeason(
    startMonth: number | null,
    startDay: number | null,
    endMonth: number | null,
    endDay: number | null
  ): boolean {
    if (!startMonth || !endMonth) {
      return true; // Available all year
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentDay = now.getDate();

    // Simple check (doesn't handle cross-year seasons)
    if (startMonth <= endMonth) {
      if (currentMonth < startMonth || currentMonth > endMonth) {
        return false;
      }
      if (currentMonth === startMonth && startDay && currentDay < startDay) {
        return false;
      }
      if (currentMonth === endMonth && endDay && currentDay > endDay) {
        return false;
      }
      return true;
    } else {
      // Season crosses year boundary
      if (currentMonth < startMonth && currentMonth > endMonth) {
        return false;
      }
      return true;
    }
  },

  /**
   * Parse references in recipe steps
   * Supports formats:
   * - [technique:1:Display Text] or [tecnica:1:Texto]
   * - [tool:1:Display Text] or [herramienta:1:Texto]
   * - [ingredient:1:Display Text] or [ingrediente:1:Texto]
   */
  parseStepReferences(description: string): Array<{
    text: string;
    type: 'ingredient' | 'technique' | 'tool';
    id: number;
  }> {
    // Regex to match [type:id:text] format
    const regex = /\[(technique|tecnica|tool|herramienta|ingredient|ingrediente):(\d+):([^\]]+)\]/g;
    const references: Array<{
      text: string;
      type: 'ingredient' | 'technique' | 'tool';
      id: number;
    }> = [];

    let match;
    while ((match = regex.exec(description)) !== null) {
      const rawType = match[1];
      let type: 'ingredient' | 'technique' | 'tool';

      // Normalize type names
      if (rawType === 'technique' || rawType === 'tecnica') {
        type = 'technique';
      } else if (rawType === 'tool' || rawType === 'herramienta') {
        type = 'tool';
      } else {
        type = 'ingredient';
      }

      references.push({
        text: match[3], // Display text
        type,
        id: parseInt(match[2], 10),
      });
    }

    return references;
  },

  /**
   * Get plain text from step description (removes references but keeps display text)
   */
  getPlainTextFromStep(description: string): string {
    // Remove [type:id:text] format, keeping only the display text
    return description.replace(/\[(technique|tecnica|tool|herramienta|ingredient|ingrediente):(\d+):([^\]]+)\]/g, '$3');
  },

  /**
   * Get step description with clickable parts identified
   * Returns array of segments with their type
   */
  parseStepSegments(description: string): Array<{
    text: string;
    isReference: boolean;
    referenceType?: 'ingredient' | 'technique' | 'tool';
    referenceId?: number;
  }> {
    const regex = /\[(technique|tecnica|tool|herramienta|ingredient|ingrediente):(\d+):([^\]]+)\]/g;
    const segments: Array<{
      text: string;
      isReference: boolean;
      referenceType?: 'ingredient' | 'technique' | 'tool';
      referenceId?: number;
    }> = [];

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(description)) !== null) {
      // Add text before the reference
      if (match.index > lastIndex) {
        segments.push({
          text: description.substring(lastIndex, match.index),
          isReference: false,
        });
      }

      // Add the reference
      const rawType = match[1];
      let type: 'ingredient' | 'technique' | 'tool';

      if (rawType === 'technique' || rawType === 'tecnica') {
        type = 'technique';
      } else if (rawType === 'tool' || rawType === 'herramienta') {
        type = 'tool';
      } else {
        type = 'ingredient';
      }

      segments.push({
        text: match[3], // Display text
        isReference: true,
        referenceType: type,
        referenceId: parseInt(match[2], 10),
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < description.length) {
      segments.push({
        text: description.substring(lastIndex),
        isReference: false,
      });
    }

    return segments;
  },
};

export default gastronomyService;
