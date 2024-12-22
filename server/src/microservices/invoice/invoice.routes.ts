import { Router } from 'express';
import { getInvoices } from './invoice.controller';
import { getAccessToRoute } from '../../middlewares/auth';

const router = Router();
router.get('/get-invoices', getAccessToRoute, getInvoices);

export default router;
