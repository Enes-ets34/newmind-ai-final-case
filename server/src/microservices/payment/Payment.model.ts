import mongoose, { Schema, Document } from 'mongoose';

interface Payment extends Document {
  userId: string;
  totalPrice: number;
  status: string;
}

const PaymentSchema = new Schema<Payment>(
  {
    userId: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model<Payment>('Payment', PaymentSchema);
