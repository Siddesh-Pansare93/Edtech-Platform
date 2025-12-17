import { UserDocument } from '@/modules/users/user.types';
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument & {
        _id: Types.ObjectId & { toString(): string };
      };
      file?: Express.Multer.File;
      files?: {
        [fieldname: string]: Express.Multer.File[];
      } | Express.Multer.File[];
    }
  }
}

