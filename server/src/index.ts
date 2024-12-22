import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from '@routes/auth';
import campaignRoutes from '@routes/campaign';
import productRoutes from '@routes/product';
import categoryRoutes from '@routes/category';
import addressRoutes from '@routes/address';
import cartRoutes from '@routes/cart';

import connectDB from '@config/db';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/cart', cartRoutes);

app.use(
  '/api/payments',
  createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);
app.use(
  '/api/invoices',
  createProxyMiddleware({
    target: 'http://localhost:4002',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
