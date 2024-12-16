import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '@config/index';
import { IUser } from '@/models/user/User.model';
interface IAuthRequest extends Request {
  user?: IUser;
}
const getAccessToRoute = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload & {
      user: IUser;
    };

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
    return;
  }
};

export { getAccessToRoute };
