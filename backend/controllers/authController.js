const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


exports.registerUser=async(req, res)=>{
    const {name, email, password, city}=req.body;

    try{
        let user=await User.findOne({email});

        if(user){
            return res.status(400).json({msg:'User already exists'});
        }

        user=new User({
            name, 
            email,
            password,
            city,
        });

        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password, salt);

        await user.save();

        const payload={
            user:{
                id:user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'24h'},
            (err, token)=>{
                if(err)throw err;
                res.json({token});
            }
        );
        

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
exports.loginUser=async (req, res) => {
    const {email, password}=req.body;

    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        const isMatch=await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg:"invalid credentials"});
        }

        const payload={
            user:{
                id:user.id, 
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'24h'},
            (err, token)=>{
                if(err)throw err;
                res.json({token});
            }
        );

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
}

// @route   PATCH /api/auth/profile
// @desc    Update user profile details
// @access  Private
exports.updateProfile=async (req, res)=>{
    try{
        const {bio, hobbies, city}=req.body;
        const userId=req.user.id;

        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({msg:"User not found"});
        }

        if(bio)user.bio=bio;
        if(hobbies)user.hobbies=hobbies;
        if(city)user.city=city;

        await user.save();

        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};