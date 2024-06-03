import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'

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
        process.exit(1); // Exit the process with failure code
    });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // replace with your frontend domain
    credentials: true // if you need to include cookies in requests
}));
app.use("/api/users",userRoutes)
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});