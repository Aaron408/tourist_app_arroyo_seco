import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "mjs", "cjs"],
  reporters: ["default"],
  clearMocks: true,
  moduleNameMapper: {
    "^@mobile/(.*)$": "<rootDir>/../mobile/$1",
    "^@pwa/(.*)$": "<rootDir>/../pwa/react-pwa/src/$1",
    // "^@/(.*)$": ["<rootDir>/../mobile/$1", "<rootDir>/../pwa/react-pwa/src/$1"], // Invalid: Jest does not support array mappings
    "^react-native$": "<rootDir>/__mocks__/react-native.ts"
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
        isolatedModules: false
      }
    ]
  }
};

export default config;
