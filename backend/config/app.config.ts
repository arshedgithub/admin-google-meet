import dotenv from 'dotenv';
dotenv.config();

export const AppConfig = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || 'some_random_jwt_secret'
}
