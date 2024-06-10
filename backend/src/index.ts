import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import hotelRoutes from './routes/hotels'
import path from 'path';
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECERET
})

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

if (!mongoConnectionString) {
    throw new Error('MONGODB_CONNECTION_STRING is not defined in the environment variables');
}

mongoose.connect(mongoConnectionString)
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users",userRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
