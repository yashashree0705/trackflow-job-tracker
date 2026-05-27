import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();
const app = express();

// Connect to Cloud Cluster Database
connectDB();

app.use(cors());
app.use(express.json());

// Main Route Gateways
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing securely under system configuration mode on port ${PORT}`));