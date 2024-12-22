import { cartSchema, ICart } from '../../models/cart/Cart.model';
import { model } from 'mongoose';

export const Cart = model<ICart>('Cart', cartSchema);
