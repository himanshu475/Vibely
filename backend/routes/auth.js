const express=require('express');
const router=express.Router();
const {registerUser, loginUser}=require('../controllers/authController');
const auth=require('../middleware/authMiddleware');
const User=require('../models/User');


// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);


// @route   GET /api/auth
// @desc    Get logged in user profile
// @access  Private
router.get('/me', auth, async(req, res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports=router;