const User=require("../models/userSchema");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register=async function(req,res){
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already registered"});
        }
        user=new User({email,password});
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({token:token});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

const login=async function(req,res){
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }
       const isMatch=await bcrypt.compare(password,user.password);
       if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"});
       }
       const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
       res.json({token:token});
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}


const signInWithGoogle = async (req, res) => {
  const {token} = req.body;

  try {
    // Verify the Google token and get user information
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name,sub } = ticket.getPayload();

    // Check if user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // Register the user if not found
      user = new User({
        email,
        name,
        googleId: sub, 
      });
      await user.save();
    }

    // Create a JWT token for the user
    const tokenId = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Send back user info and token
    res.status(200).json({
      message: "Login successful",
      tokenId,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      
      },
    });
  } catch (error) {
    console.error("Google Sign-In Error", error);
    res.status(500).json({ message: "Error authenticating with Google" });
  }
};




module.exports ={register,login,signInWithGoogle};