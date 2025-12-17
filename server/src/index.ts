import dotenv from 'dotenv';
dotenv.config({
  path: "./.env"
});

import app from "./app";
import connectToDb from './config/db';
import { cloudinaryConfig } from './shared/utils/Cloudinary';

cloudinaryConfig();
console.log(process.env.STRIPE_API_KEY)

connectToDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server ok and listening on : ", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("Failed to connect to Database");
  });
