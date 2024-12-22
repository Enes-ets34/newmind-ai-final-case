import mongoose from 'mongoose';
import { ProductSchema } from '../../models/product/Product.model';

export const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);
