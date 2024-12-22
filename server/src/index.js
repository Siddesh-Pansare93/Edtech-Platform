import dotenv from 'dotenv'
import app from "./app.js";
import connectToDb from './db/index.js';

dotenv.config({
    path: "./.env"
})


connectToDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server ok and listening on : ", process.env.PORT)
        })
    })
    .catch(()=>{
        console.log("Failed to connect to Database")
    })


