import Product from '@/models/product/Product.model';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await Product.find();
  console.log('req :>> ', req);
  res.status(200).send({
    data: products,
  });
};
export const getSingleProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const product = await Product.findOne({ slug: req.params.slug });
  console.log('req :>> ', req);
  res.status(200).send({
    data: product,
  });
};

export const filterProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId } = req.query;
    // Gelen categoryId'yi kontrol et
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId as string)) {
      res.status(400).json({ message: 'Geçersiz categoryId formatı.' });
    }

    // ObjectId'ye çevir
    const objectId = new mongoose.Types.ObjectId(categoryId as string);

    // DB'den veri çek
    const products = await Product.find({ category: objectId })
      .populate({
        path: 'category',
        select: 'subCategories',
      })
      .exec();

    // Ürünleri grupla
    const groupedProducts = products.reduce((acc, product) => {
      // @ts-ignore
      const foundSubCategory = product.category?.subCategories?.find(
        // @ts-ignore
        sub => sub._id.toString() === product.subCategory?.toString()
      );

      const subCategoryId = foundSubCategory?._id || null;
      const subCategoryTitle = foundSubCategory?.title || 'Unknown';
      // @ts-ignore
      if (!acc[subCategoryTitle]) {
        // @ts-ignore
        acc[subCategoryTitle] = {
          subCategoryId,
          subCategory: subCategoryTitle,
          products: [],
        };
      }
      // @ts-ignore
      acc[subCategoryTitle].products.push({
        _id: product._id,
        title: product.title,
        imageUrl: product.imageUrl,
        description: product.description,
        slug: product.slug,
        price: product.price,
        discountedPrice: product.discountedPrice,
      });

      return acc;
    }, {});

    res.status(200).json({
      data: Object.values(groupedProducts),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      message: 'Ürünler getirilirken hata oluştu.',
      error: error,
    });
  }
};
