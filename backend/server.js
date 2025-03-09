import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// Database Connection
connectDB();

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Define static paths for both frontends
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist'))); // User Panel
app.use(express.static(path.join(__dirname, '/admin/dist'))); // Admin Panel

// Handle React Routing for Both Panels
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
