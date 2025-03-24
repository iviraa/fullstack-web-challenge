# To-Do Application

This full-stack web application allows users to manage personal tasks securely with authentication. Built using React for the frontend and Node.js with Express for the backend, it leverages MongoDB for persistent storage. The backend is deployed on Heroku, and the frontend is hosted on Vercel.

## Project Structure
```
todo/
├── backend/                    # Node.js (Express) backend
│   ├── middleware/             # Custom Express middleware
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API route definitions
│   ├── node_modules/           # Backend dependencies
│   ├── .env                    # Environment configuration
│   ├── .env.example            # Sample environment variables
│   ├── .gitignore              # Git ignore file
│   ├── package.json            # Backend package config
│   ├── package-lock.json       # Backend lock file
│   ├── Procfile                # Heroku deployment configuration
│   └── server.js               # Entry point for backend server
│
├── client/                     # React frontend (Vite)
│   ├── public/                 # Static files
│   ├── src/                    # Source code
│   │   ├── assets/             # Images and static assets
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Context API state management
│   │   ├── routes/             # Page components and routing
│   │   ├── App.css             # App-wide styles
│   │   ├── App.jsx             # Main App component
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point for React app
│   ├── .env                    # Frontend environment variables
│   ├── .env.example            # Sample environment variables
│   ├── .gitignore              # Git ignore file
│   ├── eslint.config.js       # Linting rules
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend package config
│   ├── package-lock.json       # Frontend lock file
│   ├── vite.config.js          # Vite configuration
│   └── README.md               # Frontend README
```

## Prerequisites
- Node.js v18 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables
Copy the template and configure your variables:
```bash
cp .env.example .env
```
Edit `.env`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Step 4: Start the Backend Server
```bash
npm run dev
```
Server runs on: [http://localhost:5000](http://localhost:5000)

## Frontend Setup

### Step 1: Navigate to Frontend
```bash
cd client
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Frontend Server
```bash
npm run dev
```
Frontend available on: [http://localhost:5173](http://localhost:5173)

## Scripts

### Backend
- `npm run dev`: Start server in development mode
- `npm start`: Run production build
- `npm test`: Execute backend tests

### Frontend
- `npm run dev`: Launch frontend dev server
- `npm run build`: Create production build
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## Functionality

### User Authentication
- Users can register with username, email, and password
- Secure login using JWT

### Task Management
- CRUD operations on personal tasks
- Secure access to tasks specific to authenticated user

## Technologies

### Backend
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- CORS

### Frontend
- React (Vite)
- Material-UI
- React Router
- Axios
- Context API

## API Endpoints

| Method | Route              | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/api/register`    | User registration            |
| POST   | `/api/login`       | User login                   |
| GET    | `/api/tasks`       | Retrieve user's tasks        |
| POST   | `/api/tasks`       | Create a new task            |
| PUT    | `/api/tasks/:id`   | Update an existing task      |
| DELETE | `/api/tasks/:id`   | Delete a task                |

## Contributing

1. Fork repository
2. Create a branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -m 'Feature description'`
4. Push changes: `git push origin feature/feature-name`
5. Open a pull request

## Deployment
The backend of the application is deployed on Heroku, and the frontend is hosted on Vercel. These platforms provide robust, scalable solutions for hosting and continuous integration.

## License
Licensed under ISC License. You are free to use, modify, and distribute this software for both personal and commercial purposes, provided that the original copyright and license notice are included.

For more information, see the ISC License.
