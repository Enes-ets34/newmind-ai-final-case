import { Router } from 'express';
import { createPayment, getPayment } from './payment.controller';
import { getAccessToRoute } from '../../middlewares/auth';

const router = Router();
router.post('/', getAccessToRoute,createPayment);
router.get('/:id', getAccessToRoute, getPayment);

export default router;
