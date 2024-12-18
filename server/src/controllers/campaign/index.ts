import Campaign from '@/models/campaign/Campaign.model';
import { Request, Response } from 'express';

export const getAllCampaigns = async (
  req: Request,
  res: Response
): Promise<void> => {
  const campaigns = await Campaign.find();
  console.log('req :>> ', req);
  res.status(200).send({
    data: campaigns,
  });
};

export const getSingleCampaign = async (
  req: Request,
  res: Response
): Promise<void> => {
  const campaign = await Campaign.findOne({ _id: req.params.id });
  res.status(200).send({
    data: campaign,
  });
};
