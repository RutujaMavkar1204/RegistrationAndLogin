import express from 'express'
const app=express()
import connectDB from './db/index.js'
import dotenv from 'dotenv';
import cors from 'cors'


dotenv.config({
    path:'./.env'
})
app.use(cors({
    origin:process.env.CORS_URI,
    credentials:true
}))
connectDB()
.then(
    ()=>{
        app.listen(process.env.PORT)
    }
)
.catch((error)=>{
    console.log("error in db connection!!!!!!!!!!!", error)

})

import router from './routes/user.route.js'
app.use(express.json({limit:'16kb'}));
app.use('/api/v1/users', router);