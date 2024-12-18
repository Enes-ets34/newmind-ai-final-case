import { Router } from 'express';
import { getAllProducts ,filterProducts,getSingleProduct} from '@/controllers/products';

const router = Router();

router.get('/', getAllProducts);
router.get('/filter', filterProducts);
router.get('/:slug', getSingleProduct);

export default router;
