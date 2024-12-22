import mongoose, { ConnectOptions } from 'mongoose';
import config from '.';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 30000,
    } as ConnectOptions);
    mongoose.set('bufferCommands', false);

    console.log('MongoDB connected successfully! MAIN');
  } catch (error) {
    console.error('MongoDB bağlantı hatası MAIN:', error);
    process.exit(1);
  }
};

export default connectDB;
