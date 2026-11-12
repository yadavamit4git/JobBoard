
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes.js';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Home
app.get('/', (req, res) => {
    res.send('Job Board API is running');
});

// Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully');

        app.listen(process.env.PORT || 8000, () => {
            console.log('Server running on port 8000');
        });
    })
    .catch((error) => {
        console.log('MongoDB Error:', error.message);
    });
