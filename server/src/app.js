//This File is made so that all middleware will be applied here
// and index file doesn't get congested 
import express, { urlencoded } from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import logger from "./logger.js";




const app = express()




// MiddleWares

app.use(cors({
    origin : process.env.CORS_ORIGIN , 
    crendentials :  true 
}))


app.use(cookieParser())


app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
// app.use(morgan('dev'))



//Configuring morgan
const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
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



  //Routes 

  import userRouter from './routes/user.route.js'
  import courseRouter from "./routes/course.route.js"





  app.use("/api/v1/users" , userRouter)
  app.use("/api/v1/course" , courseRouter)



export default app