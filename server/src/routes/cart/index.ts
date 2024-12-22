import { Router } from 'express';
import { getAccessToRoute } from '@/middlewares/auth';
import {
  getCart,
  updateCart,
  createCart,
  deleteCart,
} from '@/controllers/cart';

const router = Router();

router.get('/', getAccessToRoute, getCart);
router.put('/', getAccessToRoute, updateCart);
router.post('/', getAccessToRoute, createCart);
router.delete('/', getAccessToRoute, deleteCart);

export default router;
