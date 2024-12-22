import { Product } from '../products/product.types';

export interface GetPaymentResponse {
  success: string;
  message: string;
}
export interface CreatePaymentRequest {}
export interface PaymentResponse {
  status?: string;
  data?: GetPaymentResponse;
}
