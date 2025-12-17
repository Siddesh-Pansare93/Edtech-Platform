import express, { urlencoded } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import logger from "./logger";

const app = express();

// MiddleWares
app.use(cors({
  origin: ['http://localhost:5173', 'https://skillvultures.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuring morgan
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message: string) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("OHHO! : Server is running 🥳");
});

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

export default app;
