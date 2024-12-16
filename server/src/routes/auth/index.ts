import { Router } from 'express';
import { register, login, logout } from '@controllers/auth/index';
import { getAccessToRoute } from '@/middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', getAccessToRoute, logout);

export default router;
