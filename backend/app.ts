import express from 'express';
import mongoose from 'mongoose';

import { AppConfig } from './config';

const app = express();

app.use(express.json());

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

// Basic route
app.get('/', (req, res) => {
  res.send('Admin Meet API is running');
});
