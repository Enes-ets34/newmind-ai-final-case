import { Schema, model, Document, Types } from 'mongoose';

export interface ICart extends Document {
  userId: Types.ObjectId;
  products: { product: Types.ObjectId; quantity: number }[];
  totalPrice: number;
}

export const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    products: [
      {
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Cart = model<ICart>('Cart', cartSchema);
