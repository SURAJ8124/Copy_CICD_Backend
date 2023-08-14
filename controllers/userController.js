const asyncHandler = require("express-async-handler");
const User= require("../models/userModels");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken")
//@desc Register a user
//@route Post /api/users/register
//@access public

 const ACCESS_TOKEN_SECERT= "surajchavan1532";

const registerUser= asyncHandler(async(req,res)=>{
    const {username, email, password}= req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All field are mandatory")
    }
    const userAvailable= await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User alerdy registerd!")
    }
   /* when cleint send some password it will that password may be raw password and we 
    can not store raw password in database so that's why we use hash pasword 
    that's why we use be crypt library

   */
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    })
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
     res.json({message:"Register the user"})
    
});

//@desc Login user
//@route Post /api/users/login
//@access public

const loginUser= asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    //compare password with hashPasword
    if(user&&(await bcrypt.compare(password, user.password))){
        const accessToken= jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id: user.id
            }
        }, ACCESS_TOKEN_SECERT,
        {expiresIn:"1m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});
module.exports={registerUser,loginUser};