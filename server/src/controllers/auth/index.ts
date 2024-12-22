import User from '@models/user/User.model';
import { addTokenToBlacklist, sendJwtToClient } from '@/utils/jwtUtils';
import { Request, Response } from 'express';
import redisClient from '@/utils/redisClient';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, fullName, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = new User({ email, password, fullName, phone });
    await user.save();

    sendJwtToClient(user, res);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Please check your inputs...' });
    } else {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      // @ts-ignore
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // @ts-ignore
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Bu noktada kullanıcıyı başarıyla giriş yapmış kabul edip JWT gönderelim
    sendJwtToClient(user, res); // Burada yanıtı gönderiyoruz
  } catch (error: any) {
    // @ts-ignore
    return res.status(500).json({ message: 'Error logging in', error });
  }
};


export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  }

  try {
    if (token) {
      const deletedCount = await redisClient.hDel('blacklisted_tokens', token);
      if (deletedCount === 0) {
        console.log('Token was not found in blacklist.');
      }

      await addTokenToBlacklist(token);
    }

    res
      .status(200)
      .cookie('access_token', null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true, // Geliştirme sırasında değilse, secure flag'ini kullan
      })
      .json({
        success: true,
        message: 'Logout successful',
      });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Error logging out', error });
  }
};

export const tst = async (req: Request, res: Response): Promise<void> => {
  console.log('req :> > ', req.filter);
  res.status(200).send({
    message: 'successfully',
  });
};
