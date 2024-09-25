import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI: string = process.env.MONGO_URI || 'mongodb+srv://Mujjassim:Muj%404514@mujjassimtask.ykfjs.mongodb.net/?retryWrites=true&w=majority&appName=MujjassimTask';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: Error) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });
