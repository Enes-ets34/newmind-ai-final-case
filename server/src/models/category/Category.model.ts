import mongoose, { Schema, Document, Types, Model } from 'mongoose';
import { slugify } from '@utils/slugify';

// SubCategory Interface ve Schema
export interface ISubCategory extends Document {
  title: string;
}

const SubCategorySchema: Schema<ISubCategory> = new Schema({
  title: {
    type: String,
    required: true,
  },
});

// Category Interface ve Schema
export interface ICategory extends Document {
  title: string;
  imageUrl?: string;
  slug: string;
  subCategories: Types.DocumentArray<ISubCategory>;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    subCategories: {
      type: [SubCategorySchema], // Embedded SubCategory Schema
      default: [],
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt ekler
  }
);

// Pre-save middleware for slug generation
CategorySchema.pre<ICategory>('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title);
  }
  next();
});

// Mongoose Model Tanımı
const Category: Model<ICategory> = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
