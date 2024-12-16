import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '@routes/auth';
import connectDB from '@config/db';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
