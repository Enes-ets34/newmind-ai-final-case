import jwt from 'jsonwebtoken';
import config from '@config/index';
import { IUser } from '@/models/user/User.model';
import { Request, Response } from 'express';

export const generateToken = (user: IUser): string => {
  const payload = {
    userId: user._id,
    username: user.name,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
  return token;
};
export const sendJwtToClient = (user: IUser, res: Response) => {
  const token = user.generatejwtFromUser();

  return res
    .status(200)
    .cookie('access_token', token, {
      expires: new Date(Date.now() + 1000 * 60000),
      httpOnly: true,
      secure: false,
    })
    .json({
      status: 'success',
      access_token: token,
      user,
    });
};
export const isTokenIncluded = (req: Request) => {
  return (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer: ')
  );
};
