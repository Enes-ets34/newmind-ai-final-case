import { Product } from '../products/product.types';

export interface Invoice {
  id: string;
  userId: string;
  paymentId: string;
  totalPrice: number;
  products: Product[];
  createdAt: Date;
}

export interface InvoiceResponse {
  success?: string;
  data?: Invoice[];
}

export type GetInvoiceResponse = InvoiceResponse;
