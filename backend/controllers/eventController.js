const Event = require('../models/Event');

// @route   POST /api/events
// @desc    Create a new event
// @access  Private
exports.createEvent = async (req, res) => {
    try {
        const { title, description, category, city, date, participantLimit, tags } = req.body;

        const newEvent = new Event({
            title,
            description,
            category,
            city,
            date,
            participantLimit,
            tags,
            host: req.user.id,
            participants: [req.user.id],
        });

        const event = await newEvent.save();

        res.status(201).json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/events
// @desc    Get events with optional filtering
// @access  Public
exports.getEvents = async (req, res) => {
    try {
        const { city, category, tags } = req.query;

        const query = {};

        // Default to logged-in user's city if no city is provided
        if (city) {
            query.city = city;
        }

        if (category) {
            query.category = category;
        }

        if (tags) {
            const tagsArray = Array.isArray(tags)
                ? tags
                : tags.split(',').map(tag => tag.trim()).filter(Boolean);
            if (tagsArray.length) {
                query.tags = { $in: tagsArray };
            }
        }

        const events = await Event.find(query)
            .populate('host', 'name city')
            .sort({ date: 1, createdAt: -1 });

        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/events/:id/join
// @desc    Request to join an event (creates a join request)
// @access  Private
exports.joinEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        if (event.host.toString() === userId) {
            return res.status(400).json({ msg: 'You cannot join your own event' });
        }

        const isAlreadyParticipant = event.participants.some(
            (participantId) => participantId.toString() === userId
        );

        if (isAlreadyParticipant) {
            return res.status(400).json({ msg: 'You have already joined this event' });
        }

        const hasPendingRequest = event.joinRequests.some(
            (requestId) => requestId.toString() === userId
        );

        if (hasPendingRequest) {
            return res.status(400).json({ msg: 'You already requested to join this event' });
        }

        if (event.participantLimit && event.participants.length >= event.participantLimit) {
            return res.status(400).json({ msg: 'This event is already full' });
        }

        event.joinRequests.push(userId);
        const updatedEvent = await event.save();

        const populatedEvent = await updatedEvent.populate('host', 'name city');

        res.json(populatedEvent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/events/requests
// @desc    Get join requests for events hosted by the current user
// @access  Private
exports.getJoinRequests = async (req, res) => {
    try {
        const userId = req.user.id;

        const events = await Event.find({
            host: userId,
            joinRequests: { $exists: true, $not: { $size: 0 } },
        })
            .populate('joinRequests', 'name email city')
            .populate('host', 'name city')
            .sort({ date: 1 });

        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/events/:id/requests/:userId/accept
// @desc    Accept a join request for an event
// @access  Private (host only)
exports.acceptJoinRequest = async (req, res) => {
    try {
        const { id: eventId, userId } = req.params;
        const currentUserId = req.user.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        if (event.host.toString() !== currentUserId) {
            return res.status(403).json({ msg: 'Not authorized to manage this event' });
        }

        const hasRequest = event.joinRequests.some(
            (requestId) => requestId.toString() === userId
        );

        if (!hasRequest) {
            return res.status(400).json({ msg: 'No such join request for this user' });
        }

        if (event.participantLimit && event.participants.length >= event.participantLimit) {
            return res.status(400).json({ msg: 'This event is already full' });
        }

        // Move user from joinRequests to participants
        event.joinRequests = event.joinRequests.filter(
            (requestId) => requestId.toString() !== userId
        );
        const alreadyParticipant = event.participants.some(
            (participantId) => participantId.toString() === userId
        );
        if (!alreadyParticipant) {
            event.participants.push(userId);
        }

        await event.save();

        // Return a freshly populated event to the client
        const populatedEvent = await Event.findById(eventId)
            .populate('joinRequests', 'name email city')
            .populate('host', 'name city');

        res.json(populatedEvent);
    } catch (err) {
        console.error('Error in acceptJoinRequest:', err);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/events/me
// @desc    Get events hosted by and participated in by the current user
// @access  Private
exports.getMyEvents = async (req, res) => {
    try {
        const userId = req.user.id;

        const hosted = await Event.find({ host: userId }).sort({ date: 1 });
        const participating = await Event.find({
            participants: userId,
        }).sort({ date: 1 });

        res.json({ hosted, participating });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
