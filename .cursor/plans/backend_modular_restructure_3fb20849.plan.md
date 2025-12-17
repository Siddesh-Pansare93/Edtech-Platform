---
name: Backend Modular Restructure
overview: Reorganize the backend from a traditional layered architecture into a feature-based modular architecture with TypeScript, Zod validation, and proper type safety.
todos:
  - id: setup-typescript
    content: Install TypeScript and all type definition packages
    status: completed
  - id: create-tsconfig
    content: Create tsconfig.json with proper configuration and path aliases
    status: completed
  - id: install-zod
    content: Install Zod validation library
    status: completed
  - id: create-module-structure
    content: Create the modules/ directory structure with all module folders (auth, users, courses, sections, lessons, enrollment, payment, progress, reviews, certificates)
    status: completed
  - id: create-shared-structure
    content: Create shared/ directory with middlewares/, utils/, and types/ folders
    status: completed
  - id: setup-shared-types
    content: Create shared type definitions (common.types.ts, express.d.ts, mongoose.types.ts)
    status: completed
  - id: create-validation-middleware
    content: Create Zod validation middleware for request validation
    status: completed
  - id: migrate-shared-utils
    content: Migrate and convert shared utilities to TypeScript (ApiError, ApiResponse, asyncHandler, etc.)
    status: completed
  - id: migrate-shared-middlewares
    content: Migrate and convert shared middlewares to TypeScript (auth, role, multer)
    status: completed
  - id: implement-auth-module
    content: Create auth module with TypeScript - split auth functions from user controller/service, add Zod validation and types
    status: completed
  - id: implement-users-module
    content: Create users module with TypeScript - move user model, remaining user functions, add Zod validation and types
    status: completed
  - id: implement-courses-module
    content: Create courses module with TypeScript - move course files, add Zod validation and types
    status: completed
  - id: implement-sections-module
    content: Create sections module with TypeScript - move section files, add Zod validation and types
    status: completed
  - id: implement-lessons-module
    content: Create lessons module with TypeScript - move lesson files, add Zod validation and types
    status: completed
  - id: implement-enrollment-module
    content: Create enrollment module with TypeScript - split from paymentAndEnrollment, add Zod validation and types
    status: completed
  - id: implement-payment-module
    content: Create payment module with TypeScript - split from paymentAndEnrollment, add Zod validation and types
    status: completed
  - id: implement-progress-module
    content: Create progress module with TypeScript - move progress files, add Zod validation and types
    status: completed
  - id: implement-reviews-module
    content: Create reviews module with TypeScript - move review files, add Zod validation and types
    status: completed
  - id: implement-certificates-module
    content: Create certificates module with TypeScript - move certificate model, add Zod validation and types
    status: completed
  - id: migrate-config-files
    content: Convert config files to TypeScript (db.ts, env.ts)
    status: completed
  - id: migrate-core-files
    content: Convert core files to TypeScript (app.ts, index.ts, constant.ts, logger.ts)
    status: completed
  - id: update-app-routes
    content: Update app.ts to import routes from new module locations
    status: completed
  - id: update-package-json
    content: Update package.json scripts for TypeScript development and build
    status: completed
  - id: cleanup-old-structure
    content: Remove old controllers/, routes/, models/, services/ directories after migration
    status: completed
---

# Backend Modular Architecture Restructure with TypeScript Migration

## Current Architecture Analysis

The current structure follows a **layered architecture** in JavaScript:

```
src/
├── controllers/     (7 files - .js)
├── routes/          (7 files - .js)
├── models/          (8 files - .js)
├── services/        (7 files - .js)
├── middlewares/     (3 files - .js)
├── utils/           (6 files - .js)
└── db/              (1 file - .js)
```

## Migration Goals

1. **Convert to TypeScript**: Migrate all .js files to .ts with proper type definitions
2. **Modular Architecture**: Organize by feature modules instead of layers
3. **Zod Validation**: Implement runtime validation with Zod schemas
4. **Type Safety**: Add comprehensive TypeScript types for all entities
5. **Shared Types**: Centralize common types and interfaces

## Proposed TypeScript Modular Architecture

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   ├── auth.service.ts
│   │   ├── auth.validation.ts         (Zod schemas)
│   │   └── auth.types.ts              (Module-specific types)
│   │
│   ├── users/
│   │   ├── user.controller.ts
│   │   ├── user.route.ts
│   │   ├── user.model.ts
│   │   ├── user.service.ts
│   │   ├── user.validation.ts
│   │   └── user.types.ts
│   │
│   ├── courses/
│   │   ├── course.controller.ts
│   │   ├── course.route.ts
│   │   ├── course.model.ts
│   │   ├── course.service.ts
│   │   ├── course.validation.ts
│   │   └── course.types.ts
│   │
│   ├── sections/
│   │   ├── section.controller.ts
│   │   ├── section.route.ts
│   │   ├── section.model.ts
│   │   ├── section.service.ts
│   │   ├── section.validation.ts
│   │   └── section.types.ts
│   │
│   ├── lessons/
│   │   ├── lesson.controller.ts
│   │   ├── lesson.route.ts
│   │   ├── lesson.model.ts
│   │   ├── lesson.service.ts
│   │   ├── lesson.validation.ts
│   │   └── lesson.types.ts
│   │
│   ├── enrollment/
│   │   ├── enrollment.controller.ts
│   │   ├── enrollment.route.ts
│   │   ├── enrollment.model.ts
│   │   ├── enrollment.service.ts
│   │   ├── enrollment.validation.ts
│   │   └── enrollment.types.ts
│   │
│   ├── payment/
│   │   ├── payment.controller.ts
│   │   ├── payment.route.ts
│   │   ├── payment.service.ts
│   │   ├── payment.validation.ts
│   │   └── payment.types.ts
│   │
│   ├── progress/
│   │   ├── progress.controller.ts
│   │   ├── progress.route.ts
│   │   ├── progress.model.ts
│   │   ├── progress.service.ts
│   │   ├── progress.validation.ts
│   │   └── progress.types.ts
│   │
│   ├── reviews/
│   │   ├── review.controller.ts
│   │   ├── review.route.ts
│   │   ├── review.model.ts
│   │   ├── review.service.ts
│   │   ├── review.validation.ts
│   │   └── review.types.ts
│   │
│   └── certificates/
│       ├── certificate.model.ts
│       ├── certificate.validation.ts
│       └── certificate.types.ts
│
├── shared/
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── multer.middleware.ts
│   │   └── validation.middleware.ts   (NEW - handles Zod validation)
│   │
│   ├── utils/
│   │   ├── ApiError.util.ts
│   │   ├── ApiResponse.util.ts
│   │   ├── asyncHandler.ts
│   │   ├── Cloudinary.ts
│   │   ├── isEnrolled.util.ts
│   │   └── isInstructor.util.ts
│   │
│   └── types/
│       ├── express.d.ts               (Express type extensions)
│       ├── common.types.ts            (Shared interfaces/types)
│       └── mongoose.types.ts          (Mongoose type helpers)
│
├── config/
│   ├── db.ts                          (moved from db/index.ts)
│   └── env.ts                         (Environment variable types)
│
├── app.ts
├── index.ts
├── constant.ts
├── logger.ts
└── tsconfig.json                      (TypeScript configuration)
```

## Module Breakdown with TypeScript

### 1. Auth Module

Split from current `user.controller.js` and `user.service.js`:

- **Functions**: `register`, `login`, `logout`, `refreshToken`, `generateTokens`
- **Validation**: Zod schemas for email, password strength, required fields
- **Types**: `AuthCredentials`, `AuthTokens`, `RegisterDTO`, `LoginDTO`

### 2. Users Module

Remaining user-related operations:

- **Functions**: `updateProfile`, `changePassword`, `getEnrolledCourses`, `getCreatedCourses`
- **Model**: `user.model.ts` (Mongoose with TypeScript types, JWT methods)
- **Validation**: Zod schemas for profile updates, password requirements
- **Types**: `UserDocument`, `UserRole`, `UpdateProfileDTO`, `ChangePasswordDTO`

### 3. Courses Module

From current `course.controller.js`, `course.service.js`, `course.model.js`:

- **Functions**: `create`, `update`, `delete`, `togglePublish`, `getAll`, `getDetails`, `getContent`
- **Validation**: Zod schemas for course creation/update
- **Types**: `CourseDocument`, `CreateCourseDTO`, `UpdateCourseDTO`, `CourseFilters`

### 4. Sections Module

From current `section.controller.js`, `section.service.js`, `section.model.js`:

- **Functions**: `create`, `update`, `delete`
- **Validation**: Zod schemas for section operations
- **Types**: `SectionDocument`, `CreateSectionDTO`, `UpdateSectionDTO`

### 5. Lessons Module

From current `lesson.controller.js`, `lesson.service.js`, `lesson.model.js`:

- **Functions**: `add`, `update`, `delete`
- **Validation**: Zod schemas for lesson operations
- **Types**: `LessonDocument`, `CreateLessonDTO`, `UpdateLessonDTO`

### 6. Enrollment Module

Split from `paymentAndEnrollment.controller.js`:

- **Functions**: `checkEnrollment`, `verifyAndEnroll`
- **Model**: `enrollment.model.ts`
- **Validation**: Zod schemas for enrollment operations
- **Types**: `EnrollmentDocument`, `EnrollmentStatus`, `VerifyEnrollmentDTO`

### 7. Payment Module

Split from `paymentAndEnrollment.controller.js`:

- **Functions**: `purchaseCourse`, `createStripeSession`
- **Validation**: Zod schemas for payment data
- **Types**: `PaymentSession`, `PurchaseDTO`, `StripeSessionData`

### 8. Progress Module

From current `CourseProgress.controller.js`:

- **Functions**: `updateProgress`, `getProgress`
- **Model**: `progress.model.ts`
- **Validation**: Zod schemas for progress updates
- **Types**: `ProgressDocument`, `UpdateProgressDTO`, `ProgressStats`

### 9. Reviews Module

From current `review.controller.js`:

- **Functions**: `add`, `update`, `delete`, `getAll`
- **Model**: `review.model.ts`
- **Validation**: Zod schemas with rating constraints (1-5)
- **Types**: `ReviewDocument`, `CreateReviewDTO`, `UpdateReviewDTO`

## TypeScript Configuration

Create `tsconfig.json` at server root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "types": ["node"],
    "baseUrl": ".",
    "paths": {
      "@/modules/*": ["src/modules/*"],
      "@/shared/*": ["src/shared/*"],
      "@/config/*": ["src/config/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Validation Implementation with Zod

Using **Zod** for runtime validation and type inference. Example structure:

```typescript
// modules/auth/auth.validation.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3).max(30),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['student', 'instructor']),
  skillLevel: z.string().min(1, "Skill level is required")
});

export const loginSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(1, "Password is required")
}).refine((data) => data.username || data.email, {
  message: "Either username or email is required"
});

// Type inference from Zod schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
```
```typescript
// modules/auth/auth.types.ts
import { Document } from 'mongoose';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: UserPublicData;
  tokens: AuthTokens;
}

export interface UserPublicData {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: 'student' | 'instructor';
  skillLevel: string;
  avatar?: string;
}
```

## Example Controller with TypeScript

```typescript
// modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as authService from './auth.service';
import { RegisterInput, LoginInput } from './auth.validation';

export const handleUserRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body as RegisterInput;
    const avatarLocalPath = req.file?.path;

    const createdUser = await authService.registerUser({
      ...data,
      avatarLocalPath
    });

    res.status(200).json(
      new ApiResponse(200, createdUser, "User Registered Successfully")
    );
  }
);

export const handleUserLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const credentials = req.body as LoginInput;

    const { user, accessToken, refreshToken } = await authService.loginUser(
      credentials
    );

    const options = {
      httpOnly: true,
      secure: true
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "User Logged In Successfully"
        )
      );
  }
);
```

## Mongoose Model with TypeScript

```typescript
// modules/users/user.model.ts
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
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);
```

## Shared Types Implementation

```typescript
// shared/types/common.types.ts
import { Request } from 'express';
import { UserDocument } from '@/modules/users/user.types';

export interface ApiErrorOptions {
  statusCode: number;
  message: string;
  errors?: any[];
  stack?: string;
}

export interface ApiResponseData<T = any> {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;
}

export type ObjectId = import('mongoose').Types.ObjectId;

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```
```typescript
// shared/types/express.d.ts
import { UserDocument } from '@/modules/users/user.types';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      file?: Express.Multer.File;
      files?: {
        [fieldname: string]: Express.Multer.File[];
      } | Express.Multer.File[];
    }
  }
}
```
```typescript
// shared/types/mongoose.types.ts
import { Document, Types } from 'mongoose';

export type ObjectId = Types.ObjectId;

export interface TimestampFields {
  createdAt: Date;
  updatedAt: Date;
}

export type WithId<T> = T & { _id: ObjectId };
export type WithTimestamps<T> = T & TimestampFields;
export type MongoDocument<T> = Document & WithId<T> & WithTimestamps<T>;
```

## Validation Middleware

```typescript
// shared/middlewares/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        return res.status(400).json(
          new ApiResponse(400, null, 'Validation failed', errorMessages)
        );
      }
      next(error);
    }
  };
};
```

## Route Registration Update

Update [app.ts](server/src/app.ts) to import from modules:

```typescript
// Module routes
import authRouter from './modules/auth/auth.route';
import userRouter from './modules/users/user.route';
import courseRouter from './modules/courses/course.route';
import sectionRouter from './modules/sections/section.route';
import lessonRouter from './modules/lessons/lesson.route';
import enrollmentRouter from './modules/enrollment/enrollment.route';
import paymentRouter from './modules/payment/payment.route';
import progressRouter from './modules/progress/progress.route';
import reviewRouter from './modules/reviews/review.route';

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/sections", sectionRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/enrollment", enrollmentRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/reviews", reviewRouter);
```

## Key Changes Summary

- **TypeScript Migration**: All files converted to .ts with proper type definitions
- **Zod Validation**: Runtime validation with automatic type inference from schemas
- **Separation of Concerns**: Auth logic separated from User profile management
- **Payment/Enrollment Split**: Currently combined, will be separated into distinct modules
- **Type Safety**: Module-specific types in each module, shared types centralized
- **Validation Layer**: Zod schemas for each module with type-safe validation middleware
- **Shared Resources**: Middlewares and utilities moved to `shared/` folder
- **Better Import Paths**: TypeScript path aliases for cleaner imports (@/modules, @/shared, @/config)
- **Mongoose Types**: Proper TypeScript integration with Mongoose models and documents