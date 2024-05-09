


import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

export { connectMongoose };
