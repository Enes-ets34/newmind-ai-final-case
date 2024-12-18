import { Cart } from '@/models/cart/Cart.model';
import Product from '@/models/product/Product.model';
import { IUser } from '@/models/user/User.model';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
interface IAuthRequest extends Request {
  user?: IUser;
}
export const getCart = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).send({ message: 'User ID is missing' });
    return;
  }

  try {
    const cart = await Cart.findOne({ userId }).populate('products.product');

    if (!cart) {
      res.status(404).send({
        status: 'error',
        message: 'Cart not found for the user',
      });
      return;
    }

    res.status(200).send({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);

    res.status(500).send({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const createCart = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).send({ message: 'User ID is missing' });
    return;
  }

  try {
    const { products } = req.body;

    // Kullanıcının zaten bir sepeti var mı kontrol et
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Eğer kullanıcıda bir sepet varsa, ürünleri güncelle
      cart.products = [
        ...cart.products,
        // @ts-ignore
        ...products.map(product => ({
          product: product.product,
          quantity: product.quantity,
        })),
      ];

      cart.totalPrice = await calculateTotalPrice(cart.products);
      await cart.save();
    } else {
      // Eğer sepet yoksa yeni bir tane oluştur
      const totalPrice = await calculateTotalPrice(products);

      const newCart = new Cart({
        userId,
        // @ts-ignore
        products: products.map(product => ({
          product: product.product,
          quantity: product.quantity,
        })),
        totalPrice,
      });

      cart = await newCart.save();
    }

    const populatedCart = await cart.populate('products.product');
    // @ts-ignore

    return res.status(200).send({
      status: 'success',
      data: populatedCart,
    });
  } catch (error) {
    console.error('Error creating/updating cart:', error);
    // @ts-ignore
    return res.status(500).send({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const updateCart = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { products } = req.body;
    const userId = req?.user?.id;

    // Cart'ı kullanıcıya göre bul
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // @ts-ignore
      return res.status(404).send({
        status: 'error',
        message: 'Cart not found for this user',
      });
    }

    // Mevcut ürünleri map'leyip, ürünleri güncellemeye başlayalım
    const existingProducts = new Map(
      // @ts-ignore
      cart.products.map(product => [product.product.toString(), product])
    );

    for (const product of products) {
      const existingProduct = existingProducts.get(product.product);

      if (existingProduct) {
        // Mevcut ürünün miktarını arttır
        existingProduct.quantity += product.quantity;

        // Eğer miktar sıfır veya daha düşükse, ürünü sil
        if (existingProduct.quantity <= 0) {
          existingProducts.delete(product.product);
        }
      } else {
        // Yeni ürün ekle
        if (product.quantity > 0) {
          existingProducts.set(product.product, {
            product: new Types.ObjectId(product.product),
            quantity: product.quantity,
          });
        }
      }
    }

    // Güncellenmiş ürünleri cart'a ekle
    cart.products = Array.from(existingProducts.values());

    // Eğer ürünler boşsa, cart'ı sil ve response dön
    if (cart.products.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      // @ts-ignore
      return res.status(200).send({
        status: 'success',
        message: 'Cart is empty and has been deleted',
      });
    }

    // Toplam fiyatı hesapla
    cart.totalPrice = await calculateTotalPrice(cart.products);

    // Güncellenmiş cart'ı kaydet
    const updatedCart = await cart.save();

    // Populate ile ürün bilgilerini doldur
    await updatedCart.populate('products.product');

    // @ts-ignore
    return res.status(200).send({
      status: 'success',
      data: updatedCart,
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    // @ts-ignore
    return res.status(500).send({
      status: 'error',
      message: 'An error occurred while updating the cart',
    });
  }
};
export const deleteCart = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    await Cart.deleteOne({ userId });

    res.send({
      status: 'success',
      message: 'Cart deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting cart:', error);

    res.status(500).send({
      status: 'error',
      message: 'An error occurred while updating the cart',
    });
  }
};

const calculateTotalPrice = async (products: any[]) => {
  let totalPrice = 0;
  for (const product of products) {
    const productData = await Product.findById(product.product);
    if (productData) {
      totalPrice += productData.price * product.quantity;
    }
  }
  return totalPrice;
};
