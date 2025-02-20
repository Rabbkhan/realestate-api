import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from '../utils/error.js'
import jwt from 'jsonwebtoken'
import  {SendVerificationCode, WelcomeEmail}  from "../middleware/Email.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 10);
  const verificationCode = Math.floor(100000 + Math.random()* 90000).toString()

  const newUser = new User({ username, email, password: hashPassword, verificationCode });

  try {
    await newUser.save();
SendVerificationCode(newUser.email, verificationCode)
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};




export const signin = async (req,res,next)=>{

const {email,password} = req.body;

try {
  const validUser = await User.findOne({email:email});
  if(!validUser) return next(errorHandler(404, 'User not found!'))

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if(!validPassword) return next(errorHandler(401, 'Wrong credential!'))
const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)

    res.cookie('access_token', token, {httpOnly: true}).status(200).json(validUser)


} catch (error) {
  next(error)
}




}


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      
      return res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);  // Ends response if user exists
    } 
    
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashPassword = bcryptjs.hashSync(generatedPassword, 10);

    const newUser = new User({
      username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashPassword,
      avatar: req.body.photo
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;

    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);  // Ends response if user does not exist

  } catch (error) {
    next(error);
  }
};



export const signout = async (req, res, next) =>{

try {
  res.clearCookie('access_token'); 
  res.status(200).json('User has been logged out!');
} catch (error) {
  next(error)
}

}



export const VerifyEmail = async (req,res,next)=>{
  try {
    
    const {code} = req.body;
    const user =await User.findOne({
      verificationCode:code
    })

    if(!user){
      return res.status(400).json({success:false, message:"Invalid or Expired Code "})
    }
user.isVerified =true,
user.verificationCode = undefined;
await user.save()
WelcomeEmail(user.email, user.username)
res.status(201).json("Email Verified successfully!");

  } catch (error) {
    next(error)
  }
}