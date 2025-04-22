import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'


const connectDB=async ()=>{
    try{
       console.log(`${process.env.MONGODB_URI}/${DB_NAME}`) 
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("DB connection successfull DB_HOST:",`${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("unable to connect database", error)
    }

}
export default connectDB;