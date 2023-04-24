import blog from '../models/blog'
import User from '../models/user'
import mongoose  from 'mongoose';

export const getAllBlogs = async (req, res, next)=> {
    let blogs;
    try{
        blogs  = await blog.find();
    } catch(err){
        return console.log(err);
    }

    if(!blogs){
        return res.status(404).json({message :"No Blogs Found"});
    }
    return res.status(200). json({blogs});
}

export const addBlog =async(req, res, next)=>{
    const {title, description, image, user} = req.body;

    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err);
    }

    if(!existingUser){
        return res.status(400).json({message : "Unable to find User by this Id..."})
    }

    const blogg =new blog({
        title,
        description,
        image, 
        user,
    });

    try{
       const session = await mongoose.startSession();
       session.startTransaction();
       await blogg.save({session});
       existingUser.blogs.push(blogg);
       await existingUser.save({session});
       await session.commitTransaction();   
    }catch(err){
        console.log(err);
        return res.status(500).json({message : err});
    }
    return res.status(200). json({blogg});
}

export const updateBlog = async(req, res, next)=>{
    const {title, description} = req.body;

    const blogId = req.params.id;
    let blogs;
    try{
        blogs= await blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(500).json({message: "Unable to update the blog."});
    }
    return res.status(200).json({blogs});
}

export const getById = async(req, res, next)=>{
    const id=req.params.id;
    let blogs;

    try{
        blogs=await blog.findById(id);
    } catch(err){
        return console.log(err);
    }

    if(!blogs){
        return res.status(404).json({message : "No Blogs Found !!!"});
    }
    return res.status(200).json({blogs});
}

export const deleteBlog =async(req, res, next)=>{
    const id= req.params.id;
    let blogs;
    try{
        blogs= await blog.findByIdAndDelete(id).populate("user");
        await blogs.user.blogs.pull(blogs);
        await blogs.user.save();
    }catch(err){
        return console.log(err);
    }

    if(!blogs){
        return res.status(500).json({message: "Unable to Delete"});
    }
    return res.status(200).json({message :"succefully deleted..."});
}

export const getByUserId= async(req, res, next)=> {
    const userId = req.params.id;
    let userBlogs;

    try{
        userBlogs =await User.findById(userId).populate("blogs");
    } catch(err){
        return console.log(err);
    }

    if(!userBlogs){
        return res.status(404).json({message: "No Blogs Found..."});
    }
    return res.status(200).json({blogs :userBlogs});
    
}