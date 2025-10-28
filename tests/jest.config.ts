import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  
  // Raíces actualizadas para nueva estructura
  roots: ["<rootDir>/unit", "<rootDir>/integration"],
  
  collectCoverage: true,
  coverageDirectory: "coverage",
  
  // Configuración de cobertura mejorada
  collectCoverageFrom: [
    "unit/**/*.{ts,tsx}",
    "integration/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/coverage/**",
  ],
  
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "mjs", "cjs"],
  
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "coverage",
      outputName: "junit.xml",
    }],
  ],
  
  clearMocks: true,
  
  // Mapeo de módulos
  moduleNameMapper: {
    "^@mobile/(.*)$": "<rootDir>/../mobile/$1",
    "^@pwa/(.*)$": "<rootDir>/../pwa/src/$1",
    "^react-native$": "<rootDir>/__mocks__/react-native.ts"
  },
  
  // Transformación de TypeScript
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
        isolatedModules: false
      }
    ]
  },
  
  // Patrones de test
  testMatch: [
    "<rootDir>/unit/**/*.spec.ts",
    "<rootDir>/integration/**/*.spec.ts",
  ],
  
  // Ignorar archivos
  testPathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "/e2e/",
    "/performance/",
  ],
  
  // Timeout para tests
  testTimeout: 10000,
  
  // Verbose output
  verbose: true,
};

export default config;
