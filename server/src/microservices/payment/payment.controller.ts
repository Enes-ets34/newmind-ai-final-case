import { Request, Response } from 'express';
import { Kafka } from 'kafkajs';
import Payment from './Payment.model';
import { IUser } from '../../models/user/User.model';
import { Cart } from './Cart.model';
import { ICart } from '../../models/cart/Cart.model';
import mongoose from 'mongoose';
interface IAuthRequest extends Request {
  user?: IUser;
}

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['host.docker.internal:9092'], // Docker içinde Kafka container'ına erişim
});

const producer = kafka.producer();

producer.connect();

export const createPayment = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req?.user?.id;
    console.log('addressId :>> ', req.body);

    // Kullanıcının sepetini bul
    const cart: ICart | null = await Cart.findOne({
      userId,
    });

    if (!cart) {
      res.status(404).json({ success: false, message: 'Cart not found' });
      return;
    }

    const totalPrice = cart.totalPrice;

    // Payment kaydet
    const payment = new Payment({
      userId,
      totalPrice,
      status: 'completed',
    });

    await payment.save();
    await Cart.deleteOne({ userId });

    // products?.product?._id formatında düzenleme
    const productIds = cart.products.map(product => ({
      productId: new mongoose.Types.ObjectId(product.product._id), // 'new' ekledik
      quantity: product.quantity
    }));
    console.log('productIds :>> ', productIds);
    
    await producer.send({
      topic: 'create-invoice',
      messages: [
        {
          value: JSON.stringify({
            userId,
            paymentId: payment._id,
            totalPrice,
            products: productIds,
          }),
        },
      ],
    });
    
    

    res.status(201).json({ success: true, message: req?.user?.id });
  } catch (error) {
    console.error('Error creating payment:', error);
    res
      .status(500)
      .json({ success: false, message: 'Payment creation failed' });
  }
};


export const getPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log('buraya geldi payment');
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
