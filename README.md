# To-do Application

This is a full-stack to-do application with a React frontend and Node.js/Express backend.

## Project Structure

```
todo/
├── backend/         # Express backend
└── client/          # React frontend
```

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your actual configuration values.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The backend server will start on http://localhost:5000

## Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend development server will start on http://localhost:5173

## Available Scripts

### Backend

- `npm run dev` - Start the development server
- `npm start` - Start the production server
- `npm test` - Run tests

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

### Backend

The following environment variables are required in the `.env` file:

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `JWT_EXPIRES_IN` - JWT token expiration time
- `ALLOWED_ORIGINS` - CORS allowed origins

## Technologies Used

### Backend

- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin resource sharing

### Frontend

- React with Vite
- Material-UI components
- React Router for navigation
- Axios for API requests
- JWT decode for token handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
