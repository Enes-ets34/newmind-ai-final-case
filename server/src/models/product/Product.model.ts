import mongoose, { Schema, Document, Model } from 'mongoose';
import { slugify } from '@utils/slugify';

// Interface
export interface IProduct extends Document {
  title: string;
  imageUrl: string;
  description: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  price: number;
  discountedPrice: number;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    discountedPrice: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre<IProduct>('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title);
  }
  next();
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  'Product',
  ProductSchema
);

export default Product;
