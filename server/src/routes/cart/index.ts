import { Router } from 'express';
import { getAccessToRoute } from '@/middlewares/auth';
import {
  getCart,
  updateCart,
  createCart
} from '@/controllers/cart';

const router = Router();

router.get('/', getAccessToRoute, getCart);
router.put('/', getAccessToRoute, updateCart);
router.post('/', getAccessToRoute, createCart);


export default router;
