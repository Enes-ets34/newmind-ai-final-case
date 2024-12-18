import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '@config/index';
import { IUser } from '@/models/user/User.model';
import { isTokenBlacklisted } from '@/utils/jwtUtils';
interface IAuthRequest extends Request {
  user?: IUser;
}
export const getAccessToRoute = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  const isBlacklisted = await isTokenBlacklisted(token);
  if (isBlacklisted) {
    res.status(401).json({ message: 'Token is blacklisted' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;
    req.user = decoded as IUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
    return;
  }
};
