import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs= async (req,res,next)=>{
    let blogs;
    try{
        blogs= await Blog.find()
    }catch(err){
        return console.log(err)
    }

    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json({blogs})
}

export const addblog= async (req,res,next)=>{
    const {title,description,image,user}=req.body;

    let existingUser;
    try{
        existingUser= await User.findById(user)
    }catch(err){
        return console.log(err)
    }

    if(!existingUser){
        return res.status(400).json({message:"unable to find user"})
    }
    const blog=new Blog({
        title,
        description,
        image,
        user
    })
    try{

        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();

    }catch(err){
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
}

export const updateblog= async(req,res,next)=>{
    const blogid=req.params.id
    const {title,description}=req.body
    let blog;
    try{
        blog=await Blog.findByIdAndUpdate(blogid,{
            title,
            description
        });
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"unable to update the blog"})
    }
    return res.status(200).json({blog})
}

export const getbyid= async(req,res,next)=>{
    let blog;
    const id=req.params.id
    try{
        blog = await Blog.findById(id)
    } catch(err){
        return console.log(err)
    }

    if(!blog){
        return res.status(404).json({message:'No Blog Found'})
    }
    return res.status(200).json({blog})
}

export const deleteblog=async (req,res,next)=>{
    let blog;
    const id=req.params.id 

    try{
        blog = await Blog.findByIdAndDelete(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable To Delete"})
    }
    return res.status(200).json({message:"Blog is deleted"})
}

export const getbyuserid= async (req,res,next)=>{
    const userid=req.params.id
    let userblogs;
    try{
        userblogs= await User.findById(userid).populate('blogs')
    }catch(err){
        return console.log(err)
    }

    if(!userblogs){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blogs:userblogs})
}


