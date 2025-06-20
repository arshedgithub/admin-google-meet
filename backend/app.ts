import express from 'express';
import mongoose from 'mongoose';

import { AppConfig } from './config';

import userRoutes from './routes/user.route';
import meetRoutes from './routes/meet.route';

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/meets', meetRoutes);

// MongoDB connection
mongoose.connect(AppConfig.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(AppConfig.PORT, () => {
      console.log(`Server is running on port ${AppConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
