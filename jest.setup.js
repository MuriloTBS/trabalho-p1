// Substitui o safe-area por uma versão de teste (sem precisar do provider nativo)
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);
