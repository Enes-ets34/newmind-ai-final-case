import { Request, Response } from 'express';
import User from '@models/user/User.model';
import { sendJwtToClient } from '@/utils/jwtUtils';
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = new User({ email, password, name });
    await user.save();

    sendJwtToClient(user, res);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Please check your Inputs...' });
    } else {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    sendJwtToClient(user, res);
  } catch (error: any) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};
export const logout = async (req: Request, res: Response): Promise<void> => {
  console.log('req :>> ', req);
  res
    .status(200)
    .cookie('access_token', null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
    })
    .json({
      success: true,
      message: 'Logout Successfull',
    });
};
