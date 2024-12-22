import { Address } from '@/models/address/Address.model';
import { IUser } from '@/models/user/User.model';
import { Request, Response } from 'express';
export interface IAuthRequest extends Request {
  user?: IUser;
}
export const getAdressList = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const address = await Address.find({ userId: req.user?.id });
  res.status(200).send({
    data: address,
  });
};
export const createAddress = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const address = await Address.create({
    ...req.body,
    userId,
  });
  res.status(200).send({
    data: address,
  });
};
export const deleteAddress = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const id = req?.params?.id;
  await Address.findByIdAndDelete(id);
  res.status(200).send({
    message: 'deleted',
  });
};
export const updateAddress = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const id = req.params?.id;
  const updatedAddress = await Address.findByIdAndUpdate(id);
  res.status(200).send({
    data: updatedAddress,
  });
};
