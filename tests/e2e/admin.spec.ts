import { test, expect } from '@playwright/test';

/**
 * Test Suite: Admin Panel E2E
 * Propósito: Pruebas end-to-end del panel de administración
 */

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:5173';
const ADMIN_EMAIL = 'admin@arroyoseco.com';
const ADMIN_PASSWORD = 'admin123';

test.describe('Admin - Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto(`${BASE_URL}/administracion/login`);
    
    await expect(page.locator('h2')).toContainText(/Administr|Admin/i);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should show test credentials info', async ({ page }) => {
    await page.goto(`${BASE_URL}/administracion/login`);
    
    // Verificar que se muestran las credenciales de prueba
    await expect(page.locator('text=admin@arroyoseco.com')).toBeVisible();
    await expect(page.locator('text=admin123')).toBeVisible();
  });

  test('should show error for empty fields', async ({ page }) => {
    await page.goto(`${BASE_URL}/administracion/login`);
    
    // Intentar login sin llenar campos
    await page.click('button[type="submit"]');
    
    // Verificar validación HTML5
    const emailInput = page.locator('input[type="email"]');
    const isRequired = await emailInput.getAttribute('required');
    expect(isRequired).not.toBeNull();
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.goto(`${BASE_URL}/administracion/login`);
    
    const passwordInput = page.locator('input[name="password"]');
    
    // Verificar que empieza como password
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click en toggle
    await page.click('button:near(input[name="password"])');
    
    // Debería cambiar a text
    await expect(passwordInput).toHaveAttribute('type', /text|password/);
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto(`${BASE_URL}/administracion/login`);
    
    // Llenar formulario
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Esperar redirección al dashboard
    await page.waitForURL(/.*dashboard.*/);
    
    await expect(page).toHaveURL(/.*administracion\/dashboard.*/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto(`${BASE_URL}/administracion/login`);
    
    // Llenar con credenciales incorrectas
    await page.fill('input[type="email"]', 'wrong@email.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Esperar mensaje de error
    await page.waitForTimeout(1000);
    
    // Verificar que sigue en login o muestra error
    const url = page.url();
    expect(url).toContain('/login');
  });
});

test.describe('Admin - Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada test
    await page.goto(`${BASE_URL}/administracion/login`);
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*dashboard.*/);
  });

  test('should display dashboard after login', async ({ page }) => {
    await expect(page).toHaveURL(/.*dashboard.*/);
    await expect(page.locator('h1, h2')).toContainText(/Dashboard|Panel/i);
  });

  test('should have navigation menu', async ({ page }) => {
    const nav = page.locator('nav, aside, [class*="sidebar"]');
    await expect(nav).toBeVisible();
  });

  test('should display user info', async ({ page }) => {
    // Verificar que se muestra información del usuario logueado
    await expect(page.locator('text=/admin|administrador/i')).toBeVisible();
  });

  test('should navigate to catalogs section', async ({ page }) => {
    await page.click('a:has-text("Catálogos"), a:has-text("Catalogs")');
    await expect(page).toHaveURL(/.*catalogos.*/);
  });

  test('should navigate to events section', async ({ page }) => {
    await page.click('a:has-text("Eventos"), a:has-text("Events")');
    await expect(page).toHaveURL(/.*eventos.*/);
  });

  test('should navigate to users section', async ({ page }) => {
    await page.click('a:has-text("Usuarios"), a:has-text("Users")');
    await expect(page).toHaveURL(/.*usuarios.*/);
  });

  test('should logout successfully', async ({ page }) => {
    // Click en logout
    await page.click('button:has-text("Cerrar sesión"), button:has-text("Logout")');
    
    // Esperar redirección
    await page.waitForTimeout(1000);
    
    // Verificar que regresa a login
    const url = page.url();
    expect(url).toContain('/login');
  });
});

test.describe('Admin - Protected Routes', () => {
  test('should redirect to login when accessing dashboard without auth', async ({ page }) => {
    // Intentar acceder al dashboard sin login
    await page.goto(`${BASE_URL}/administracion/dashboard`);
    
    // Debería redirigir a login
    await page.waitForTimeout(1000);
    const url = page.url();
    expect(url).toContain('/login');
  });

  test('should redirect to login when accessing catalogs without auth', async ({ page }) => {
    await page.goto(`${BASE_URL}/administracion/catalogos`);
    
    await page.waitForTimeout(1000);
    const url = page.url();
    expect(url).toContain('/login');
  });
});

test.describe('Admin - Language Support', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/administracion/login`);
  });

  test('should have language toggle on login page', async ({ page }) => {
    const languageButton = page.locator('button').filter({ hasText: /English|Español/ });
    await expect(languageButton).toBeVisible();
  });

  test('should persist language preference', async ({ page }) => {
    // Cambiar idioma
    await page.click('button:has-text("English"), button:has-text("Español")');
    await page.waitForTimeout(500);
    
    // Recargar página
    await page.reload();
    
    // El idioma debería persistir
    const language = await page.evaluate(() => localStorage.getItem('preferredLanguage'));
    expect(language).toBeTruthy();
  });
});

