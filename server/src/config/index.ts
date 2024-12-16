import dotenv from 'dotenv';

dotenv.config(); 

export type Config = {
  environment: string;
  port: number;
  mongoUri: string;
  redisHost: string;
  redisPort: number;
  jwtSecret: string;
  kafkaBroker: string;
};

const config: Config = {
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),

  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/newmindai-final-case-test-db',

  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),

  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',

  kafkaBroker: process.env.KAFKA_BROKER || 'localhost:9092',
};

export default config;
