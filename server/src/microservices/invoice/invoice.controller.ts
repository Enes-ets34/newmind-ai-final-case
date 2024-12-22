import { Request, Response } from 'express';
import { Product } from './Product.model';
import { IUser } from '../../models/user/User.model';
import Invoice, { IInvoice } from './Invoice.model';
import { Kafka } from 'kafkajs';
import mongoose from 'mongoose';

export interface IAuthRequest extends Request {
  user?: IUser;
}

const kafka = new Kafka({
  clientId: 'invoice-service',
  brokers: ['host.docker.internal:9092'],
});

const consumer = kafka.consumer({ groupId: 'invoice-group' });

export const startInvoiceConsumer = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({ topic: 'create-invoice', fromBeginning: true });

    console.log('Invoice Consumer is running...');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('topic, partition:>> ', topic, partition);
        try {
          const invoiceData: IInvoice = JSON.parse(
            message.value?.toString() || '{}'
          );

          // products dizisini güncelliyoruz: productId ve quantity
          const products = invoiceData.products.map(product => ({
            productId: new mongoose.Types.ObjectId(product.productId),
            quantity: product.quantity,
          }));

          const invoice = new Invoice({
            userId: invoiceData.userId,
            paymentId: invoiceData.paymentId,
            totalPrice: invoiceData.totalPrice,
            products: products,
          });

          await invoice.save();
          console.log('Invoice created:', invoice);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  } catch (error) {
    console.error('Error starting Invoice Consumer:', error);
  }
};

export const getInvoices = async (req: IAuthRequest, res: Response) => {
  try {
    // Kullanıcıya ait faturaları getir
    const invoices = await Invoice.find({ userId: req?.user?.id });

    if (!invoices || invoices.length === 0) {
      res.status(404).json({ message: 'Invoices not found' });
      return;
    }

    // Faturaları populate et
    const populatedInvoices = await Promise.all(
      invoices.map(async invoice => {
        const populatedProducts = await Promise.all(
          invoice.products.map(async product => {
            try {
              const productData = await Product.findById(product.productId);
              if (!productData) {
                console.log(
                  `Ürün bulunamadı: productId = ${product.productId}`
                );
              }
              return (
                // @ts-ignore
                { product: productData, quantity: product.quantity } || null
              );
            } catch (error) {
              console.error(
                `Hata oluştu: productId = ${product.productId}`,
                error
              );
              return null;
            }
          })
        );

        // Null ürünleri filtrele
        const validProducts = populatedProducts.filter(
          product => product !== null
        );

        return { ...invoice.toObject(), products: validProducts };
      })
    );

    res.json({ success: true, data: populatedInvoices });
  } catch (error) {
    console.error('Error:>> ', error);
    res.status(500).json({ success: false, message: error });
  }
};
