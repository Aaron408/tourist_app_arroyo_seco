# Pruebas de funcionamiento

## Cobertura de comprobaciones
- Linter: `npm run lint`
- Pruebas unitarias Jest: `npm run test`
- Pruebas unitarias en modo sin fallar si no hay suites: `npm run test -- --passWithNoTests`
- Pruebas E2E Playwright: `npm run test:e2e` (requiere entorno con navegadores Playwright)

## Resultado de la ultima ejecucion local
- `npm run lint`
  - Estado: exitoso
  - Notas: Node.js muestra advertencia sobre `type: module` para `eslint.config.js`. Se puede eliminar agregando "type": "module" en `package.json`.
- `npm run test`
  - Estado: exitoso
  - Suites ejecutadas: `src/sample.spec.ts`, `src/mobile/theme.spec.ts`, `src/pwa/sleep.spec.ts`
  - Cobertura: generada en `coverage/`
- `npm run test:e2e`
  - No ejecutado durante esta sesion. Requiere servicio base en `http://localhost:8081` o configurar `E2E_BASE_URL`.

## Requisitos previos
- Ejecutar `npm install` en la carpeta `tests/`
- Para Playwright, instalar navegadores: `npx playwright install --with-deps`

## Observaciones
- Las pruebas acceden a codigo de `mobile/` y `pwa/react-pwa/` mediante alias `@mobile/*`, `@pwa/*` y `@/*`.
- Se mockea `react-native` via `tests/__mocks__/react-native.ts` y definiciones en `tests/types/react-native.d.ts`.

<img width="1844" height="465" alt="image" src="https://github.com/user-attachments/assets/14fbb9ad-e954-4a9d-b4b6-5df46814e2c1" />
