# Project Structure

This project follows a clean separation between source code and tests:

```
ticket-triage-genie--1-/
├── src/                          # All source code
│   ├── components/               # React components
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── Header.tsx
│   │   ├── HowItWorksModal.tsx
│   │   ├── icons.tsx
│   │   ├── TicketCard.tsx
│   │   ├── TicketImporter.tsx
│   │   └── TicketList.tsx
│   ├── services/                 # API and external services
│   │   └── geminiService.ts
│   ├── utils/                    # Utility functions
│   │   └── ticketHelpers.ts
│   ├── App.tsx                   # Main application component
│   ├── constants.ts              # Application constants
│   ├── index.css                 # Global styles
│   ├── metadata.json             # Application metadata
│   └── types.ts                  # TypeScript type definitions
├── test/                         # All test files
│   ├── app/                      # App-level tests
│   │   └── App.test.tsx
│   ├── components/               # Component tests
│   │   ├── Header.test.tsx
│   │   └── TicketCard.test.tsx
│   ├── services/                 # Service tests
│   │   └── geminiService.test.ts
│   ├── utils/                    # Utility tests
│   │   └── ticketHelpers.test.ts
│   └── setupTests.ts             # Test configuration
├── index.html                    # HTML entry point
├── index.tsx                     # React entry point
├── jest.config.js                # Jest configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── README.md                     # Project documentation
```

## Benefits of This Structure

### 🎯 **Clear Separation of Concerns**
- **`src/`**: Contains all production code
- **`test/`**: Contains all test code
- No mixing of tests with source code

### 🔍 **Easy Navigation**
- Tests mirror the source structure
- Easy to find corresponding test files
- Clear organization by feature type

### 🛠️ **Maintainable Configuration**
- Jest configured to look in `test/` folder
- Import paths clearly show source vs test files
- Tailwind scans only `src/` for classes

### 📦 **Build Optimization**
- Build tools only process `src/` for production
- Tests excluded from production bundles
- Clear distinction between dev and prod files

## Import Patterns

### Source Files (in `src/`)
```typescript
// Relative imports within src/
import { Component } from './components/Component';
import { utility } from './utils/utility';
import type { MyType } from './types';
```

### Test Files (in `test/`)
```typescript
// Import source files from test files
import Component from '../../src/components/Component';
import { utility } from '../../src/utils/utility';
import type { MyType } from '../../src/types';
```

## npm Scripts

```bash
npm test                    # Run main tests (components + utils)
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report
npm run test:components    # Run only component tests
npm run test:utils         # Run only utility tests
npm run test:services      # Run only service tests
npm run test:app           # Run only app tests
npm run test:all           # Run all tests including problematic ones
```