import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import paymentRoutes from './payment.routes';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      'mongodb://host.docker.internal:27017/newmindai-final-case-test-db',
      {
        serverSelectionTimeoutMS: 30000,
      } as ConnectOptions
    );
    mongoose.set('bufferCommands', false);

    console.log('MongoDB connected successfully! => payment');
  } catch (error) {
    console.error('MongoDB bağlantı hatası PAYMENT:', error);
    process.exit(1);
  }
};
connectDB();
const app = express();
const PORT = process.env.PAYMENT_PORT || 4000;
app.use(cors());
app.use(express.json());
app.use('/', paymentRoutes);


app.listen(PORT, () => {
  console.log(`Payment service is running on port ${PORT}`);
});
