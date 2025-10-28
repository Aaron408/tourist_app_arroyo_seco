import { test, expect } from '@playwright/test';

/**
 * Test Suite: Landing Page E2E
 * Propósito: Pruebas end-to-end del sitio público
 */

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:5173';

test.describe('Landing - Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Verificar que la página cargue
    await expect(page).toHaveTitle(/Arroyo Seco/i);
    
    // Verificar elementos principales
    await expect(page.locator('h1')).toContainText(/Arroyo Seco|Welcome/i);
  });

  test('should display language switcher', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Buscar botón de cambio de idioma
    const languageButton = page.locator('button:has-text("English"), button:has-text("Español")');
    await expect(languageButton).toBeVisible();
  });

  test('should toggle language when clicking switcher', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Obtener texto inicial
    const initialText = await page.locator('h1').textContent();
    
    // Click en el switcher
    const languageButton = page.locator('button').filter({ hasText: /English|Español/ }).first();
    await languageButton.click();
    
    // Esperar cambio
    await page.waitForTimeout(500);
    
    // Verificar que el texto cambió
    const newText = await page.locator('h1').textContent();
    expect(initialText).not.toBe(newText);
  });

  test('should navigate to gastronomy section', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Click en link de gastronomía
    await page.click('a:has-text("Gastronomía"), a:has-text("Gastronomy")');
    
    // Verificar URL
    await expect(page).toHaveURL(/.*gastronomia.*/);
  });

  test('should display feature cards', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Verificar que hay al menos 3 tarjetas de características
    const featureCards = page.locator('[class*="grid"] > div, [class*="feature"]');
    await expect(featureCards).toHaveCount(3);
  });

  test('should have responsive navigation menu', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Verificar navegación
    const nav = page.locator('nav, header');
    await expect(nav).toBeVisible();
  });
});

test.describe('Landing - Gastronomy Section', () => {
  test('should display recipes page', async ({ page }) => {
    await page.goto(`${BASE_URL}/gastronomia/recetas`);
    
    await expect(page.locator('h1, h2')).toContainText(/Recetas|Recipes/i);
  });

  test('should display ingredients page', async ({ page }) => {
    await page.goto(`${BASE_URL}/gastronomia/ingredientes`);
    
    await expect(page.locator('h1, h2')).toContainText(/Ingredientes|Ingredients/i);
  });

  test('should navigate between gastronomy subsections', async ({ page }) => {
    await page.goto(`${BASE_URL}/gastronomia`);
    
    // Click en recetas
    await page.click('a:has-text("Recetas"), a:has-text("Recipes")');
    await expect(page).toHaveURL(/.*recetas.*/);
    
    // Volver a gastronomía
    await page.goBack();
    
    // Click en ingredientes
    await page.click('a:has-text("Ingredientes"), a:has-text("Ingredients")');
    await expect(page).toHaveURL(/.*ingredientes.*/);
  });
});

test.describe('Landing - Locations Section', () => {
  test('should display locations page', async ({ page }) => {
    await page.goto(`${BASE_URL}/ubicaciones`);
    
    await expect(page.locator('h1, h2')).toContainText(/Ubicaciones|Locations/i);
  });

  test('should load interactive map', async ({ page }) => {
    await page.goto(`${BASE_URL}/ubicaciones/mapa-interactivo`);
    
    // Verificar que la página del mapa cargue
    await expect(page).toHaveURL(/.*mapa-interactivo.*/);
  });
});

test.describe('Landing - Events Section', () => {
  test('should display events page', async ({ page }) => {
    await page.goto(`${BASE_URL}/eventos`);
    
    await expect(page.locator('h1, h2')).toContainText(/Eventos|Events/i);
  });

  test('should display workshops page', async ({ page }) => {
    await page.goto(`${BASE_URL}/eventos/talleres`);
    
    await expect(page).toHaveURL(/.*talleres.*/);
  });

  test('should display flavor route page', async ({ page }) => {
    await page.goto(`${BASE_URL}/eventos/ruta-del-sabor`);
    
    await expect(page).toHaveURL(/.*ruta-del-sabor.*/);
  });
});

test.describe('Landing - Performance', () => {
  test('should load home page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(BASE_URL);
    
    const loadTime = Date.now() - startTime;
    
    // Debería cargar en menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have valid meta tags for SEO', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Verificar meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });
});

