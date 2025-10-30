import '@testing-library/jest-dom';

// Mock environment variables for testing
process.env.GEMINI_API_KEY = 'test-api-key';

// Mock fetch for API calls
global.fetch = jest.fn();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});