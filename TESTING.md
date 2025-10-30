# Unit Testing Setup

## Overview

This project uses Jest with React Testing Library for unit testing. The setup includes:

- **Jest**: Test runner and framework
- **React Testing Library**: Utilities for testing React components
- **Jest DOM**: Custom matchers for DOM elements
- **ts-jest**: TypeScript support for Jest

## Configuration

### Jest Configuration (`jest.config.js`)
- ES modules support with `ts-jest/presets/default-esm`
- jsdom environment for DOM testing
- Setup file for test utilities
- CSS module mocking with `identity-obj-proxy`
- Path mapping support

### Setup File (`src/setupTests.ts`)
- Imports Jest DOM matchers
- Mocks environment variables
- Provides global test utilities

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Component Tests (`components/__tests__/`)
- Test component rendering
- Test user interactions
- Test prop handling
- Test styling classes

### Service Tests (`services/__tests__/`)
- Mock external APIs
- Test error handling
- Test data transformation

### Example Test Patterns

#### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('handles click events', () => {
    const mockHandler = jest.fn();
    render(<MyComponent onClick={mockHandler} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
```

#### Service Testing
```typescript
import { mockApiCall } from '../myService';

jest.mock('external-library', () => ({
  ExternalClass: jest.fn().mockImplementation(() => ({
    method: jest.fn().mockResolvedValue('mocked result')
  }))
}));

describe('myService', () => {
  it('handles successful API calls', async () => {
    const result = await mockApiCall();
    expect(result).toEqual('expected result');
  });
});
```

## Best Practices

1. **Arrange, Act, Assert**: Structure tests clearly
2. **Mock External Dependencies**: Use Jest mocks for APIs and libraries
3. **Test User Behavior**: Focus on what users see and do
4. **Descriptive Test Names**: Make test intentions clear
5. **Cleanup**: Reset mocks between tests

## Coverage

Coverage reports show:
- Statement coverage
- Branch coverage  
- Function coverage
- Line coverage

Aim for high coverage while focusing on meaningful tests.