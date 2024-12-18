import { Router } from 'express';
import { getAllCampaigns, getSingleCampaign } from '@/controllers/campaign';

const router = Router();

router.get('/', getAllCampaigns);
router.get('/:id', getSingleCampaign);

export default router;
