import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '@/config';
export interface IUser extends Document {
  id: ObjectId;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  isAdmin: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  generatejwtFromUser: () => Promise<string>;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.generatejwtFromUser = function () {
  const JWT_SECRET_KEY = config.jwtSecret;

  const payload = {
    _id: this.id,
    fullName: this.fullName,
    isAdmin: this.isAdmin,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
};
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
