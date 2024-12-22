import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  userId: string;
  paymentId: string;
  totalPrice: number;
  products: { productId: mongoose.Types.ObjectId, quantity: number }[]; // Güncelledik
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    userId: { type: String, required: true, ref: 'User' },
    paymentId: { type: String, required: true, ref: 'Payment' },
    totalPrice: { type: Number, required: true },
    products: [{
      productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' }, // productId alanı
      quantity: { type: Number, required: true } // quantity alanı
    }],
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema);

export default Invoice;
