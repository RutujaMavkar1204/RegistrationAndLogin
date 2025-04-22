import {User} from '../models/user.model.js'
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
export {registration}