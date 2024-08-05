import User from '../model/User.js';
import bcrypt from 'bcryptjs'

export const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message:'User Not Found'})
    }
    return res.status(200).json({users})

}

export const signup=async(req,res,next)=>{
    const{name,password,email}=req.body;
    
    let existinguser;
    try{
        existinguser=await User.findOne({email})
    }catch(err){
        return console.log(err)
    }

    if(existinguser){
        return res.status(400).json({error:"user already exist"})
    }

    const hashedpassword=bcrypt.hashSync(password)

    const user=new User({
        name,
        password:hashedpassword,
        email
    })

    try{
        await user.save();
    }catch(err){
        return console.log(err)
    }
    return res.status(201).json({user})
}

export const login= async(req,res,next)=>{
    const {password,email}=req.body
    let existinguser;
    try{
        existinguser= await User.findOne({email})
    }catch(err){
        return console.log(err)
    }

    if(!existinguser){
        return res.status(404).json({message:"could'nt find user by this email"})
    }

    const ispassword=bcrypt.compareSync(password,existinguser.password)
    if(!ispassword){
        return res.status(400).json({message:"Type correct password"})
    }

    return res.status(200).json({message:"Login Successful"})
}
