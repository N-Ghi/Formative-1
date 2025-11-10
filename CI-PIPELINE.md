# CI Pipeline Documentation

## Overview

This project includes a comprehensive Continuous Integration (CI) pipeline that automatically tests and validates code changes before they are merged.

## Pipeline Triggers

The CI pipeline automatically runs on:

### ✅ Push Events
- Triggers on pushes to **any branch EXCEPT main**
- Allows testing of feature branches and development work
- Prevents accidental CI runs on production branch

### ✅ Pull Request Events
- Triggers on pull requests targeting the **main branch**
- Ensures code quality before merging to production
- Required checks must pass before merge

## Pipeline Structure

The CI pipeline consists of three parallel jobs:

```
CI Pipeline
├── Backend CI (runs in parallel)
├── Frontend CI (runs in parallel)
└── Docker Compose (runs after both complete)
```

---

## Job 1: Backend CI

**Purpose**: Validates backend code quality, tests, and Docker build

### Steps:

1. **Checkout Code**
   - Uses: `actions/checkout@v4`
   - Clones the repository

2. **Set up Node.js**
   - Uses: `actions/setup-node@v4`
   - Version: Node.js 20
   - Enables npm caching for faster builds

3. **Install Dependencies**
   - Command: `npm ci`
   - Installs exact versions from package-lock.json
   - Faster and more reliable than `npm install`

4. **Run Linting** ⚠️ FAILS ON ERROR
   - Command: `npm run lint`
   - Uses ESLint to check code quality
   - **Pipeline fails if linting errors found**

5. **Run Tests** ⚠️ FAILS ON ERROR
   - Command: `npm test`
   - Uses Jest for unit testing
   - **Pipeline fails if any test fails**
   - Runs in test environment

6. **Build Docker Image** ⚠️ FAILS ON ERROR
   - Builds backend Docker image
   - Tags with commit SHA
   - **Pipeline fails if build fails**

---

## Job 2: Frontend CI

**Purpose**: Validates frontend code quality, tests, and Docker build

### Steps:

1. **Checkout Code**
   - Uses: `actions/checkout@v4`
   - Clones the repository

2. **Set up Node.js**
   - Uses: `actions/setup-node@v4`
   - Version: Node.js 20
   - Enables npm caching for faster builds

3. **Install Dependencies**
   - Command: `npm ci`
   - Installs exact versions from package-lock.json

4. **Run Linting** ⚠️ FAILS ON ERROR
   - Command: `npm run lint`
   - Uses ESLint for code quality
   - **Pipeline fails if linting errors found**

5. **Run Tests** ⚠️ FAILS ON ERROR
   - Command: `npm test`
   - Uses Vitest for unit testing
   - **Pipeline fails if any test fails**

6. **Build Application**
   - Command: `npm run build`
   - Creates production build with Vite
   - Verifies build succeeds

7. **Build Docker Image** ⚠️ FAILS ON ERROR
   - Builds frontend Docker image
   - Tags with commit SHA
   - **Pipeline fails if build fails**

---

## Job 3: Docker Compose Build

**Purpose**: Validates full application stack

### Prerequisites:
- Runs **only after** backend-ci and frontend-ci complete successfully
- Uses: `needs: [backend-ci, frontend-ci]`

### Steps:

1. **Checkout Code**
   - Clones repository

2. **Build with Docker Compose** ⚠️ FAILS ON ERROR
   - Command: `docker-compose build`
   - Builds all services
   - **Pipeline fails if build fails**

3. **Start Services**
   - Command: `docker-compose up -d`
   - Starts containers in detached mode

4. **Wait for Services**
   - Allows services to initialize

5. **Check Services Health**
   - Command: `docker-compose ps`
   - Verifies all services are running

6. **Cleanup**
   - Command: `docker-compose down`
   - Stops and removes containers

---

## Quality Enforcement

### ⚠️ Pipeline WILL Fail If:

1. **Linting Fails**
   - Code doesn't meet ESLint standards
   - Syntax errors
   - Code quality issues

2. **Tests Fail**
   - Any unit test fails
   - Test coverage issues
   - Test environment problems

3. **Docker Build Fails**
   - Dockerfile errors
   - Missing dependencies
   - Build configuration issues

4. **Docker Compose Fails**
   - Service startup issues
   - Network configuration problems
   - Volume mounting issues

---

## Running Tests Locally

### Backend Tests

```bash
cd backend

# Install dependencies
npm install

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Frontend Tests

```bash
cd frontend

# Install dependencies
npm install

# Run linting
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Docker Build Tests

```bash
# Build individual services
docker build -t backend-test ./backend
docker build -t frontend-test ./frontend

# Build with Docker Compose
docker-compose build

# Test full stack
docker-compose up
```

---

## Test Configuration

### Backend Testing (Jest)

**Configuration**: `backend/jest.config.js`

**Test Files**: `backend/__tests__/**/*.test.js`

**Features**:
- ES Modules support
- Node.js test environment
- Code coverage reporting
- Async/await support

### Frontend Testing (Vitest)

**Configuration**: `frontend/vitest.config.js`

**Test Files**: `frontend/src/**/*.test.{js,jsx}`

**Features**:
- React Testing Library
- jsdom environment
- Component testing
- Fast execution with Vite

---

## Linting Configuration

### Backend Linting (ESLint)

**Configuration**: `backend/.eslintrc.json`

**Rules**:
- ES2021 syntax
- 4-space indentation
- Single quotes
- Semicolons required
- Unix line endings

### Frontend Linting (ESLint)

**Configuration**: `frontend/eslint.config.js`

**Rules**:
- React best practices
- React Hooks rules
- React Refresh compatibility
- Modern JavaScript standards

---

## CI Pipeline Workflow File

**Location**: `.github/workflows/ci.yml`

**Status Badge**: Add to README.md
```markdown
![CI Pipeline](https://github.com/YOUR_USERNAME/Formative-1/workflows/CI%20Pipeline/badge.svg)
```

---

## Troubleshooting CI Failures

### Linting Failures

```bash
# Check linting locally
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Common issues:
# - Unused variables
# - Missing semicolons
# - Incorrect indentation
# - Import order
```

### Test Failures

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- path/to/test.js

# Check test environment
NODE_ENV=test npm test

# Common issues:
# - Missing dependencies
# - Environment variables not set
# - Database connection issues
# - Async timing issues
```

### Docker Build Failures

```bash
# Build with verbose output
docker build --no-cache -t test-image .

# Check Dockerfile syntax
docker build --dry-run -t test-image .

# Common issues:
# - Missing dependencies in Dockerfile
# - Incorrect file paths
# - Permission issues
# - Port conflicts
```

### Docker Compose Failures

```bash
# Check compose file syntax
docker-compose config

# Build with no cache
docker-compose build --no-cache

# View logs
docker-compose logs

# Common issues:
# - Service dependencies
# - Network configuration
# - Volume permissions
# - Environment variables
```

---

## Best Practices

### Before Pushing Code

1. ✅ Run linting: `npm run lint`
2. ✅ Fix linting issues: `npm run lint:fix`
3. ✅ Run tests: `npm test`
4. ✅ Test Docker build: `docker-compose build`
5. ✅ Commit with meaningful message

### Writing Tests

1. ✅ Write tests for new features
2. ✅ Maintain test coverage above 70%
3. ✅ Test both success and failure cases
4. ✅ Use descriptive test names
5. ✅ Keep tests isolated and independent

### Code Quality

1. ✅ Follow ESLint rules
2. ✅ Write clean, readable code
3. ✅ Add comments for complex logic
4. ✅ Keep functions small and focused
5. ✅ Use meaningful variable names

---

## Adding New Tests

### Backend Test Example

```javascript
// backend/__tests__/example.test.js
describe('Feature Name', () => {
    test('should do something', () => {
        // Arrange
        const input = 'test';
        
        // Act
        const result = someFunction(input);
        
        // Assert
        expect(result).toBe('expected');
    });
});
```

### Frontend Test Example

```javascript
// frontend/src/test/Component.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Component from '../components/Component';

describe('Component', () => {
    it('should render correctly', () => {
        render(<Component />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
});
```

---

## CI/CD Pipeline Extensions

### Future Enhancements

- [ ] Add code coverage reporting
- [ ] Add performance benchmarks
- [ ] Add security scanning
- [ ] Add dependency vulnerability checks
- [ ] Add automated deployments
- [ ] Add staging environment tests
- [ ] Add E2E tests with Playwright
- [ ] Add visual regression tests

---

## Status and Monitoring

### Viewing Pipeline Status

1. Go to GitHub repository
2. Click "Actions" tab
3. View recent workflow runs
4. Click on specific run for details

### Pipeline Notifications

- ✅ Success: Green checkmark
- ❌ Failure: Red X
- 🟡 In Progress: Yellow circle
- ⏭️ Skipped: Gray dash

---

## Support

For CI pipeline issues:
1. Check workflow logs in GitHub Actions
2. Run tests locally to reproduce
3. Review this documentation
4. Check individual job logs for details

---

**Last Updated**: November 10, 2025  
**Version**: 1.0.0  
**Status**: ✅ Active

