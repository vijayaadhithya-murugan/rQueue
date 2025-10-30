# Git Management for Testing Files

## ✅ **Files TO Commit** (Testing Infrastructure)
```
jest.config.js                 # Jest configuration
test/setupTests.ts            # Test setup utilities
test/                         # All test files
├── app/                      # App tests
├── components/               # Component tests
├── services/                 # Service tests
└── utils/                    # Utility tests
TESTING.md                    # Testing documentation
PROJECT_STRUCTURE.md          # Project structure guide
```

## ❌ **Files NOT to Commit** (Generated/Temporary)
```
coverage/                     # Test coverage reports (HTML, XML, JSON)
node_modules/                 # Dependencies
dist/                         # Build output
.env.local                    # Local environment variables
*.log                         # Log files
.cache/                       # Cache directories
```

## 🧹 **Clean Up Commands**
```bash
# Remove coverage files (already in .gitignore)
rm -rf coverage/

# Remove node_modules if needed
rm -rf node_modules/
npm install

# Remove build files
rm -rf dist/
npm run build
```

## 📝 **Best Practices**

1. **Always run tests before committing:**
   ```bash
   npm test
   ```

2. **Generate coverage reports locally only:**
   ```bash
   npm run test:coverage
   ```

3. **Coverage reports are for local analysis - never commit them**

4. **Test files ARE committed - they're part of your codebase**

5. **Use `.gitignore` to exclude generated/temporary files**

## 🔄 **Workflow**
1. Write code + tests
2. Run `npm test` to verify 
3. Commit source code + test files
4. Generate coverage locally with `npm run test:coverage`
5. View coverage report, then delete `coverage/` folder
6. Repeat