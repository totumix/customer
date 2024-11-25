export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      '**/?(*.)+(test).ts',  // Busca archivos que terminen en .test.ts
      '**/?(*.)+(spec).ts',   // O en .spec.ts
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };
  