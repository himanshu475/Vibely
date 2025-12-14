const express = require('express');
const router = express.Router();
const { createEvent, getEvents, joinEvent, getJoinRequests, acceptJoinRequest, getMyEvents } = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/events
// @desc    Create a new event
// @access  Private
router.post('/', auth, createEvent);



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