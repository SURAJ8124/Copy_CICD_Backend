const express =require("express");
const { registerUser, loginUser} = require("../controllers/userController");

const router= express.Router();

router.post("/register",registerUser);

router.post("/login", loginUser );

router.post("/current",(req,res)=>{
    res.json({message:"current the user"});
});

module.exports = router;