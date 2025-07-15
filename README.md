# MERN Bug Tracker

A full-stack bug tracker application built with the MERN stack (MongoDB, Express, React, Node.js). Users can report, update, and track bugs, with robust testing and debugging practices applied throughout.

---

## Features
- Report new bugs
- View a list of all reported bugs
- Update bug statuses (open, in-progress, resolved)
- Delete bugs
- Error handling on both client and server
- Comprehensive unit and integration tests

---

## Project Structure
```
root/
  server/           # Backend (Express, MongoDB)
  client/           # Frontend (React)
```

---

## Installation & Running

### 1. Clone the Repository
```bash
git clone repo
cd repo-folder
```

### 2. Backend Setup
```bash
cd server
pnpm install
# Create a .env file with your MongoDB URI (see .env.example)
pnpm run dev
# or
pnpm start
```
- The backend will run on [http://localhost:5000](http://localhost:5000)

### 3. Frontend Setup
```bash
cd ../client
pnpm install
pnpm start
```
- The frontend will run on [http://localhost:3000](http://localhost:3000)

### 4. Proxy Setup
- The `client/package.json` includes a proxy to the backend for API calls:
  ```json
  "proxy": "http://localhost:5000"
  ```

---

## Running Tests

### Backend (server)
```bash
cd server
pnpm test
```
- Runs unit tests (helpers) and integration tests (API routes, with mocked DB).

### Frontend (client)
```bash
cd client
pnpm test
```
- Runs unit and integration tests for React components using React Testing Library and Jest.

---

## Debugging Techniques Used
- **Console logs**: Used in both backend and frontend for tracking values and errors.
- **Node.js Inspector**: Run the backend with `pnpm run dev -- --inspect` and debug using Chrome DevTools.
- **Chrome DevTools**: Inspect network requests, React component state, and errors in the browser.
- **Error Boundaries**: React error boundaries catch and display UI errors gracefully.
- **Express Error Middleware**: Centralized error handling in the backend for consistent error responses.
- **Intentional Bugs**: Introduced and debugged using the above tools to demonstrate best practices.

---

## Testing Approach & Coverage

### Backend
- **Unit Tests**: For helper functions (e.g., validation logic).
- **Integration Tests**: For API endpoints (create, update, delete bugs), using Supertest and Jest, with database calls mocked.
- **Coverage**: Ensures all core logic and error cases are tested.

### Frontend
- **Unit Tests**: For React components (form validation, button clicks, rendering states).
- **Integration Tests**: For API calls and UI updates (e.g., submitting a bug, updating status, deleting).
- **Error Handling**: Tests for error boundaries and error messages.
- **Coverage**: Focuses on user flows and edge cases.

---

## Additional Notes
- The app uses modern React (hooks, functional components) and best practices for maintainability.
- Styling is handled via CSS for a clean, modern look.
- Easily extensible for authentication, filtering, or more advanced features.

---

## License
MIT 