import { Router } from 'express';
import { register, login, logout, tst } from '@controllers/auth/index';
import { getAccessToRoute } from '@/middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/test', getAccessToRoute, tst);

export default router;
