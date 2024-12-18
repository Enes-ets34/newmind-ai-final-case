import jwt from 'jsonwebtoken';
import config from '@config/index';
import { IUser } from '@/models/user/User.model';
import { Request, Response } from 'express';
import redisClient from '@/utils/redisClient';

const REDIS_BLACKLIST_KEY = 'blacklisted_tokens';

export const generateToken = (user: IUser): string => {
  const payload = {
    id: user._id,
    username: user.fullName,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
  return token;
};

export const sendJwtToClient = async (
  user: IUser,
  res: Response
): Promise<void> => {
  const token = generateToken(user);

  const decoded = jwt.decode(token) as jwt.JwtPayload;
  if (decoded && decoded.exp) {
    await redisClient.hSet(REDIS_BLACKLIST_KEY, token, decoded.exp.toString());
  }

  res
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

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  try {
    const result = await redisClient.hGet('blacklisted_tokens', token);
    return result === 'true';
  } catch (error) {
    console.error('Error checking token in blacklist:', error);
    return false;
  }
};
export const addTokenToBlacklist = async (token: string): Promise<void> => {
  try {
    await redisClient.hSet('blacklisted_tokens', token, 'true');
  } catch (error) {
    console.error('Error adding token to blacklist:', error);
  }
};
export const isTokenIncluded = (req: Request) => {
  return (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer: ')
  );
};
