const express=require('express');
const router=express.Router();
const {createEvent, getEvents}=require('../controllers/eventController');
const auth=require('../middleware/authMiddleware');

// @route   POST /api/events
// @desc    Create a new event
// @access  Private
router.post('/', auth, createEvent);

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', getEvents);


module.exports=router;