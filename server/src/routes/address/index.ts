import { Router } from 'express';
import { getAccessToRoute } from '@/middlewares/auth';
import {
  createAddress,
  getAdressList,
  deleteAddress,
  updateAddress,
} from '@/controllers/address';

const router = Router();

router.get('/user-addresses', getAccessToRoute, getAdressList);
router.post('/create', getAccessToRoute, createAddress);
router.delete('/delete/:id', getAccessToRoute, deleteAddress);
router.put('/update/:id', getAccessToRoute, updateAddress);

export default router;
