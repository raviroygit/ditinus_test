const express = require("express")
// const { default: mongoose } = require("mongoose")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = express();
const port = 3001;
const cors = require('cors');

const JWT_SECRET='jdjfnkjnjnn232n3jnj'
// connect to the database

mongoose.connect('mongodb://localhost:27017');


app.use(express.json());
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // For legacy browser support
}
app.use(cors(corsOptions));

// creating user model here

const User = mongoose.model('User',{
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});

// creating route here

// register route here
app.post('/register',async(req,res)=>{
    const { email, password, fullname, phone} = req.body;
  
    try{
        const user = new User({email,phone,fullname,password})
        await user.save();
        res.json({message:"User registered successfully"});
    }catch(err){
        res.status(500).json({err:err});
    }
})

// login route

app.post('/login',async(req,res)=>{
    const { email, password} = req.body;
  
    try{
        const user = await User.findOne({email, password});
        if(user){
             const token = jwt.sign({userId:user._id},JWT_SECRET);
             res.json({message:"LoggedIN successfully",user,token:token});
        }else{
            res.status(401).json({status:401,msg:"Invalid user"});
        }
    }catch(err){
        res.status(500).json({err:err});
    }
})


app.listen(3001,()=>{
    console.log(`Server is running on port ${port}`)
});