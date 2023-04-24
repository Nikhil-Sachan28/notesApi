const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signin = async(req, res) =>{

    const {email, password} = req.body;
    try{
        //existing user check
        const existingUser = await userModel.findOne({email : email});
        if(!existingUser){
            return res.status(400).json({message : "user not found"});
        }
        //hash password generate 
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message : "Invalid credentials"});
        }
        // Token generation
        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, SECRET_KEY);
        res.status(201).json({user: existingUser , token : token});
    }
    catch(error){
        console.log(error)
        res.status(400).json({message : "something went wrong"})
    }
}

const signup = async (req, res) =>{
    const {username, email, password} = req.body;
    try{
        //existing user check
        const existingUser = await userModel.findOne({email : email});
        if(existingUser){
            return res.status(400).json({message : "user already exists"});
        }
        //hash password generate 
        const hashedPassword = await bcrypt.hash(password, 10);
        //user creation
        const result = await userModel({
            username : username,
            password : hashedPassword,
            email : email
        });
        // Token generation
        const token = jwt.sign({email : result.email, id : result._id}, SECRET_KEY);


        const created = await result.save();
        console.log(created);
        res.status(201).json({user: result , token : token});
    }
    catch(error){
        console.log(error)
        res.status(400).json({message : "something went wrong"})
    }
};

module.exports = {signin, signup};