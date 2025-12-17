import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'student' | 'instructor';
  skillLevel: string;
  avatar?: string;
  refreshToken?: string;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}

export type UserDocument = Document & IUser & IUserMethods;

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'instructor'], lowercase: true },
  skillLevel: { type: String, required: true },
  avatar: { type: String },
  refreshToken: { type: String }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function (): Promise<string> {
  const payload = {
    _id: this._id.toString(),
    username: this.username,
    email: this.email,
    role: this.role
  };
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  const options = { 
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY! 
  } as jwt.SignOptions;
  return jwt.sign(payload, secret, options) as string;
};

userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  const payload = { _id: this._id.toString() };
  const secret = process.env.REFRESH_TOKEN_SECRET!;
  const options = { 
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY! 
  } as jwt.SignOptions;
  return jwt.sign(payload, secret, options) as string;
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);

