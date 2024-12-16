import mongoose, { ConnectOptions } from 'mongoose';
import config from '.';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

export default connectDB;
