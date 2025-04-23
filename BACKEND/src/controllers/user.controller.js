import {User} from '../models/user.model.js'


const generateAccessAndRefreshTokens=async(userId)=>{
    const user=await User.findById(userId)
    const accessToken=await user.generateAccessTokens();
    const refreshToken=await user.generateRefreshTokens();

    user.refreshToken=refreshToken;
    await user.save({validateBeforeSave:false})


    return{accessToken, refreshToken}
}
const registration=async(req, res)=>{
    /*
    1.get detail from user
    2.check validation
    3.check for user
    4.create user
    5.send res
    */
    const {email, phoneNumber, username, name, password}=req.body

    if(!(email || phoneNumber || username || name || password)){
        console.log("ERROR :all fields are required");
    }
     
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
      });
      
      if (existedUser) {
        return res.status(400).json({ error: "User with same email or username already exists" });
      }
    const user=await User.create({
        name:name.toLowerCase(),
        username,
        email,
        password,
        phoneNumber
    })
    const createdUser=await User.findById(user._id).select( '-password -refreshToken');
    console.log(createdUser)
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
    });
    
}

const login=async(req, res)=>{
    /*
    take info from body
    check if info is get
    check if user is present of that username or email
    check for password if correct
    send res
     */
    const{email,username,password}=req.body;
    if(!(email||username)){
        return res.status(404).json({
            success:false,
            message:"Enter the information"
        })
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        return res.status(404).json({
            success:false,
            message:"unauthorized access"
        })
    }
    const correctPassword=await user.isPasswordCorrect(password);
    if(!correctPassword){
        return res.status(404).json({
            success:false,
            message:"Incorrect password"
        })
    }

    const {accessToken, refreshToken}=await generateAccessAndRefreshTokens(user._id);
    const loggedInUser=await User.findById(user._id).select("password refreshToken");
    if(!loggedInUser){
        return res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
    const options={
        httpOnly:true,
        secure:true
    }
    res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({
        success:true,
        message:'logged in Successfully'
    })



}
export {
    registration,
    login
}