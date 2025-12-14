const express=require('express');
const router=express.Router();
const {createEvent, getEvents, sendJoinRequests, manageJoinRequest, getEventById, deleteEvent, patchEvent, leaveEvent}=require('../controllers/eventController');
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


// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Host Only)
router.patch('/:id', auth, patchEvent);

// @route   PUT /api/events/:id/leave
// @desc    Allow a user to leave an event
// @access  Private
router.put('/:id/leave', auth, leaveEvent);



// @route   POST /api/events/:id/join
// @desc    Request to join an event
// @access  Private
router.post('/:id/join', auth, joinEvent);

// @route   GET /api/events
// @desc    Get events with optional filtering
// @access  Public
router.get('/', getEvents);

// @route   GET /api/events/requests
// @desc    Get join requests for events hosted by the current user
// @access  Private
router.get('/requests', auth, getJoinRequests);

// @route   POST /api/events/:id/requests/:userId/accept
// @desc    Accept a join request
// @access  Private
router.post('/:id/requests/:userId/accept', auth, acceptJoinRequest);

// @route   GET /api/events/me
// @desc    Get events hosted by and participated in by the current user
// @access  Private
router.get('/me', auth, getMyEvents);

module.exports = router;