const express=require('express');
const router=express.Router();
const {createEvent, getEvents, sendJoinRequests, manageJoinRequest, getEventById, deleteEvent}=require('../controllers/eventController');
const auth=require('../middleware/authMiddleware');

// @route   POST /api/events
// @desc    Create a new event
// @access  Private
router.post('/', auth, createEvent);

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', getEvents);


// @route   POST /api/events/:id/requests
// @desc    Send a join request to an event
// @access  Private
router.post('/:id/requests', auth, sendJoinRequests);

// @route   PUT /api/events/:id/requests/:userId
// @desc    Accept or decline a join request
// @access  Private (Host Only)
router.put('/:id/requests/:userId', auth, manageJoinRequest);

// @route   GET /api/events/:id
// @desc    Get a single event by ID
// @access  Public
router.get('/:id', getEventById);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Host Only)
router.delete('/:id', auth, deleteEvent);


module.exports=router;