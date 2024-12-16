import express, { Request, Response } from 'express';
import connectDB from './config/db';
import config from '@/config';

const app = express();

app.use(express.json());

const port = config.port || 3000;

connectDB();

app.get('/', (req: Request, res: Response) => {
  console.log('Request:', req);
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
