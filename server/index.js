import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import PostRouter from './routes/post.route.js';
import GenerateImageRouter from './routes/generateimage.route.js';
import AuthRouter from './routes/auth.route.js';
import { protect } from './middleware/auth.middleware.js';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const _dirname= path.resolve();

// Middlewares
app.use(cors({
  origin: 'https://dev-ai-six.vercel.app'
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/posts', protect, PostRouter);
app.use('/api/generateImage', GenerateImageRouter);  

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error('Error:', err);
    res.status(statusCode).json({ 
        success: false, 
        message: err.message || 'Something went wrong!' 
    });
});

// MongoDB connection
const mongoconnect = async () => {
    try {
        const uri = `${process.env.MONGODB_URI}/devAI?retryWrites=true&w=majority`;
        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

app.get('/', (req, res) => {
    res.json({ 
        message: 'API is running',
        mongodbUri: process.env.MONGODB_URI ? 'MongoDB URI is set' : 'MongoDB URI is missing',
        cloudName: process.env.CLOUD_NAME ? 'Cloudinary name is set' : 'Cloudinary name is missing',
        apiKey: process.env.API_KEY ? 'API key is set' : 'API key is missing',
        apiSecret: process.env.API_SECRET ? 'API secret is set' : 'API secret is missing'
    });
});

const startServer = async () => {
    try {
        await mongoconnect();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
