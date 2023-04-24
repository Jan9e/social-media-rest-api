import User from '../models/user';
import bcrypt from 'bcryptjs';

export const getalluser = async( req, res, next)=>{
    let users;
    
    try{
        users=await User.find();
    }catch(err){
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message: "NO Users Found !!!"});
    }
    return res.status(200).json({users});
};

export const signup = async( req, res, next)=>{
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch (err){
        return console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: "User already exists ! Login instead"});
    }

    const hashedpassword = bcrypt.hashSync(password);

    const user =new User({
        name,
        email,
        password: hashedpassword,
        blogs : [],
    });

    try{
        await user.save();
    }catch(err){
        return console.log(err);
    }

    return res.status(201). json({user});
}

export const login =async(req, res, next)=>{
    const {email, password}= req.body;

    let existingUser;
    try{
        existingUser =await User.findOne({email});
    }catch(err){
        return res.status(404).json({message: "Couldn't find user with this email. Signup instead !!!"});
    }

    const isPasswordCorrect =bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"});
    }
    return res.status(200).json({message : "Login Successful"});
}