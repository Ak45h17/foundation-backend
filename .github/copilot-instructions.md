# Copilot Instructions for FOUNDATION

## Project Overview
Early-stage Node.js/Express backend application with planned MongoDB integration. The project uses a modular structure with separate routes and models directories.

**Tech Stack:**
- **Runtime:** Node.js with CommonJS modules
- **Framework:** Express 5.2.1
- **Database:** MongoDB via Mongoose 9.0.2
- **Environment:** Dotenv for config management
- **Dev Tools:** Nodemon for auto-restart during development

**Current State:** Project skeleton created with dependencies installed. `models/` and `routes/` directories exist but are empty. `server.js` is partially implemented.

## Architecture & File Structure

```
backend/
├── server.js          # Express app initialization (INCOMPLETE)
├── models/            # Mongoose schemas (EMPTY - to be populated)
├── routes/            # API route handlers (EMPTY - to be populated)
├── .env               # Environment variables (empty)
├── package.json       # Dependencies & project metadata
└── node_modules/      # Installed packages
```

**Key Patterns:**
- Routes and models should be separate files in their respective directories
- CommonJS module system (`require`/`module.exports`)
- Express middleware pattern for JSON parsing already started

## Developer Workflows

### Setup & Installation
```powershell
# In backend/ directory
npm install              # Install dependencies (already done)
npm install --save-dev nodemon  # Development dependency (already done)
```

### Running the Server
```powershell
# Manual start (not yet configured in package.json)
node server.js

# With Nodemon auto-restart (recommended for development)
npx nodemon server.js
```

**Note:** Add `"start"` and `"dev"` scripts to `package.json` for convenience:
```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

### Environment Configuration
- Use `.env` file for sensitive data (database URI, port, API keys)
- Load with: `require('dotenv').config()`
- Access variables via `process.env.VARIABLE_NAME`

## Common Patterns & Conventions

### Express Setup Pattern
When completing `server.js`:
- Require Express after dotenv configuration
- Apply middleware before routes
- Define routes using separate files imported into server.js
- Add error handling middleware at the end

### Model Structure (To Implement)
- Each Mongoose model in `models/` should be a separate file
- Export schema and model together
- Example: `models/user.js`, `models/product.js`

### Route Structure (To Implement)
- Each route file in `routes/` should be an Express Router
- Export the router: `module.exports = router`
- Import in `server.js` and mount: `app.use('/api/users', usersRouter)`

### Environment Variables Expected
- `PORT` - Server port (default: 3000 if not specified)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment type (development/production)

## Critical Next Steps for AI Agents

1. **Complete `server.js`:**
   - Load environment variables (dotenv)
   - Set PORT from `process.env.PORT || 3000`
   - Add database connection (Mongoose)
   - Define basic routes
   - Add 404 and error handling middleware

2. **Create Initial Models:**
   - Define schema files in `models/`
   - Establish clear field names and types
   - Add validation where needed

3. **Create Initial Routes:**
   - Set up route handlers in `routes/`
   - Follow RESTful conventions
   - Connect to models for CRUD operations

4. **Update package.json:**
   - Add `"dev"` and `"start"` scripts
   - Update description field

## Integration Points
- **MongoDB:** Connection happens in `server.js` before routes are mounted
- **Express Routing:** Mount routers on app in `server.js`
- **Middleware Order:** JSON parser → routes → error handler
