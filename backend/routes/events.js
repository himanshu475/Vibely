const express=require('express');
const router=express.Router();
const {createEvent}=require('../controllers/eventController');
const auth=require('../middleware/authMiddleware');

// @route   POST /api/events
// @desc    Create a new event
// @access  Private
router.post('/', auth, createEvent);


module.exports=router;