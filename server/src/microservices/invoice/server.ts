// @ts-ignore
import { Product } from './Product.model';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import invoiceRoutes from './invoice.routes';
import mongoose, { ConnectOptions } from 'mongoose';
import { startInvoiceConsumer } from './invoice.controller';

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

    console.log('MongoDB connected successfully! => invoice');
  } catch (error) {
    console.error('MongoDB bağlantı hatası INVOICE:', error);
    process.exit(1);
  }
};
connectDB();
const app = express();
const PORT = process.env.INVOICE_PORT || 4002;
app.use(cors());
app.use(express.json());
app.use('/', invoiceRoutes);

startInvoiceConsumer();
app.listen(PORT, () => {
  console.log(`Invoice service is running on port ${PORT}`);
});
