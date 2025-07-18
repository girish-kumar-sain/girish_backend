# Backend Setup Guide

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGO_URL=mongodb://localhost:27017/blog_app
SECRET_KEY=your_secret_key_here_change_in_production
```

## MongoDB Setup

1. Make sure MongoDB is installed and running on your system
2. The app will automatically create the database when it connects

## Running the Application

1. Install dependencies: `npm install`
2. Start the server: `npm start` or `node app.js`

## Frontend Setup

1. Navigate to the frontend directory: `cd frontend1`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:2900`. 