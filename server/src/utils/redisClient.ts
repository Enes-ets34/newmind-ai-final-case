import config from '@/config';
import { createClient } from 'redis';

const redisHost = config.redisHost;
const redisPort = config.redisPort;
const redisClient = createClient({
  url: config
    ? `${'redis://' + redisHost + ':' + redisPort}`
    : 'redis://localhost:6379',
});

redisClient.on('error', (err: any) => {
  console.error('Redis Client Error', err);
});

// Redis bağlantısı kurulduğunda mesaj yazdır
redisClient.on('connect', () => {
  console.log('Redis connected successfully!');
});

redisClient.connect();

export default redisClient;
