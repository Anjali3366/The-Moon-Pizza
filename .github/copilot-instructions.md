# AI Coding Agent Instructions for The-Moon-Pizza

Welcome to The-Moon-Pizza codebase! This document provides essential guidelines for AI coding agents to be productive and aligned with the project's architecture, workflows, and conventions.

## Project Overview

The-Moon-Pizza is a full-stack application with the following structure:

- **Frontend**: Built with React and Vite, located in `frontend/`. It includes components, pages, and context for state management.
- **Admin Panel**: Another React + Vite application in `admin/` for managing backend data.
- **Backend**: A Node.js server using Express, located in `backend/`. It handles API routes, database interactions, and authentication.

### Key Directories

- `frontend/src/components/`: Reusable React components for the user-facing application.
- `frontend/src/pages/`: Page-level components for routing.
- `admin/src/`: Similar structure to `frontend/` but tailored for admin functionality.
- `backend/routes/`: API route definitions.
- `backend/controllers/`: Business logic for API endpoints.
- `backend/models/`: Mongoose models for MongoDB.
- `backend/utils/`: Utility functions like token creation and password hashing.

## Developer Workflows

### Frontend

1. **Start Development Server**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. **Build for Production**:
   ```bash
   npm run build
   ```
3. **Linting**:
   ESLint is configured. Run:
   ```bash
   npm run lint
   ```

### Backend

1. **Start Server**:
   ```bash
   cd backend
   npm install
   node server.js
   ```
2. **Environment Variables**:
   - `backend/config/db.js` expects MongoDB connection details.
   - Create a `.env` file with required variables.

### Admin Panel

1. **Start Development Server**:
   ```bash
   cd admin
   npm install
   npm run dev
   ```

## Project-Specific Conventions

- **Component Structure**:
  - Each component has its own folder with `.jsx` and `.css` files.
  - Example: `frontend/src/components/Navbar/Navbar.jsx` and `Navbar.css`.

- **State Management**:
  - `frontend/src/context/StoreContext.jsx` manages global state using React Context API.

- **API Integration**:
  - Frontend communicates with the backend via REST APIs defined in `backend/routes/`.

## Integration Points

- **Database**:
  - MongoDB is used for data storage.
  - Models are defined in `backend/models/`.

- **Authentication**:
  - JWT-based authentication.
  - Token creation logic in `backend/utils/createToken.js`.

- **File Uploads**:
  - Handled in `backend/uploads/`.

## Examples

### Adding a New Page
1. Create a folder in `frontend/src/pages/`.
2. Add `PageName.jsx` and `PageName.css`.
3. Update routing in `frontend/src/App.jsx`.

### Adding a New API Endpoint
1. Define the route in `backend/routes/`.
2. Implement the logic in `backend/controllers/`.
3. Update the model in `backend/models/` if needed.

---

For any unclear or incomplete sections, please provide feedback to improve this document.