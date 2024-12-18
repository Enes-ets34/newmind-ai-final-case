import Category from '@/models/category/Category.model';
import { Request, Response } from 'express';

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categories = await Category.find();
  console.log('req :>> ', req);
  res.status(200).send({
    data: categories,
  });
};

