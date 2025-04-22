import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
        
    },
    refreshToken:{
        type:String,
    },
},{timestamps:true}
)

userSchema.pre('save',async function(next){
 if(!this.isModified("password")){return next()};
 this.password=await bcrypt.hash(this.password,10)
 next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessTokens=function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,    
        }
)

}

userSchema.methods.generateRefreshTokens= function(){
    return jwt.sign(
    {
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)

}




export const User=mongoose.model('User', userSchema)