const express=require('express');
const router=express.Router();
const {createEvent, getEvents, sendJoinRequests, manageJoinRequest, getEventById, deleteEvent, patchEvent, leaveEvent, getJoinRequests, acceptJoinRequest, getMyEvents, joinEvent}=require('../controllers/eventController');
const auth=require('../middleware/authMiddleware');



// @route GET /api/events/requests - Get join requests for events hosted by the current user
router.get('/requests', auth, getJoinRequests);

// @route GET /api/events/me - Get events hosted by and participated in by the current user
router.get('/me', auth, getMyEvents);

// @route POST /api/events - Create a new event
router.post('/', auth, createEvent);

// @route GET /api/events - Get all events (base discovery/filtering)
router.get('/', getEvents);



// DYNAMIC ROUTES (/:id) - 


// @route POST /api/events/:id/join - Request to join an event
router.post('/:id/join', auth, joinEvent);

// Note: You have two request-management routes. Ensure the one with the specific ID comes first.

// @route POST /api/events/:id/requests/:userId/accept - Accept a join request
router.post('/:id/requests/:userId/accept', auth, acceptJoinRequest);

// @route PUT /api/events/:id/requests/:userId - Accept or decline a join request (Alternative management route)
router.put('/:id/requests/:userId', auth, manageJoinRequest);


// @route POST /api/events/:id/requests - Send a join request to an event (If needed alongside /:id/join)
router.post('/:id/requests', auth, sendJoinRequests);


// @route GET /api/events/:id - Get a single event by ID
router.get('/:id', getEventById);

// @route DELETE /api/events/:id - Delete an event
router.delete('/:id', auth, deleteEvent);

// @route PUT /api/events/:id - Update an event
router.patch('/:id', auth, patchEvent);

// @route PUT /api/events/:id/leave - Allow a user to leave an event
router.put('/:id/leave', auth, leaveEvent);

module.exports = router;