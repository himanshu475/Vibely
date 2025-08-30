const Event=require('../models/Event');

//@route POST/api/events
//@desc Create a new event
//@access Private
exports.createEvent=async (req, res)=>{
    try{
        const {title, description, category, city, date, participantLimit, tags}=req.body;

        const newEvent=new Event({
            title,
            description,
            category,
            city,
            date,
            participantLimit,
            tags,
            host:req.user.id,
            participants:[req.user.id],
        });

        const event=await newEvent.save();

        res.status(201).json(event);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }
};


// @route   GET /api/events
// @desc    Get all events
// @access  Public
exports.getEvents=async(req, res)=>{
    try{

        const {city, category, tags, tagMode}=req.query;
        let filter={};

        if(city){
            filter.city=new RegExp(city, 'i');
        }

        if(category){
            filter.category=new RegExp(category, 'i');
        }

        if(tags){
            const tagsArray=tags.split(',').map(tag=>new RegExp(tag.trim(), 'i'));
            
            if(tagMode==='any'){
                filter.tags={$in:tagsArray}; //matches any of the tags
            }
            else{
                filter.tags={$all:tagsArray};
            }
        }


        const events=await Event.find(filter)
            .populate('host', 'name city email')
            .sort({date:1});
        
        res.json(events);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @route   POST /api/events/:id/requests
// @desc    Send a join request to an event
// @access  Private
exports.sendJoinRequests=async(req, res)=>{
    try{
        const event=await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({msg:'Event not found'});
        }

        if(event.participants.includes(req.user.id)){
            return res.status(400).json({msg:'you are already a participant of this event'});
        }

        if(event.joinRequests.includes(req.user.id)){
            return res.status(400).json({msg:"You have already send a join request to this event"});
        }

        event.joinRequests.push(req.user.id);
        await event.save();

        res.json({msg:"Join request send successfully"});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   PUT /api/events/:id/requests/:userId
// @desc    Accept or decline a join request
// @access  Private (Host Only)
exports.manageJoinRequest=async(req, res)=>{
    try{
        const event=await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({msg:"Event not found"});
        }

        if(event.host.toString()!==req.user.id){
            return res.status(401).json({msg:"User is not authorized to manage this event"});
        }

        const {action}=req.body;
        const userId=req.params.userId;

        const requestIndex=event.joinRequests.indexOf(userId);

        if(requestIndex===-1){
            return res.status(404).json({msg:"Join request not found"});
        }

        if(action==='accept'){
            if(event.participants.length>=event.participantLimit){
                return res.status(400).json({msg:'Event is already full'});
            }
            
            event.participants.push(userId);
            event.joinRequests.splice(requestIndex, 1);

            res.json({msg: 'Join request accepted'});
        }
        else if(action==='decline'){
            event.joinRequests.splice(requestIndex, 1);
            res.json({msg:"join request declined"});
        
        }
        else{
            return res.status(400).json({ msg: 'Invalid action. Must be "accept" or "decline"' });
        }

    await event.save();



    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
   
};


// @route   GET /api/events/:id
// @desc    Get a single event by ID
// @access  Public
exports.getEventById=async(req, res)=>{
    try{
        const event=await Event.findById(req.params.id)
            .populate('host', 'name email city')
            .populate('participants', 'name email city')
            .populate('joinRequests', 'name email city');
        
        if(!event){
            return res.status(404).json({msg:"Event not found"});
        }

        res.json(event);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Host Only)
exports.deleteEvent=async(req, res)=>{
    try{
        const event=await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({msg:"Event not found"});
        }

        if(event.host.toString()!==req.user.id){
            return res.status(401).json({msg:"User is not authorized to delete this event"});
        }

        await event.deleteOne();

        res.json({msg:"Event removed"});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Host Only)
exports.patchEvent=async (req, res) => {
    try{
        const {title, description, category, city, date, participantLimit, tags}=req.body;

        let event=await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({msg:"Event not found"});
        }

        if(event.host.toString()!==req.user.id){
            return res.status(401).json({msg:"User is not authorized to update this event"});
        }

        if (title) event.title = title;
        if (description) event.description = description;
        if (category) event.category = category;
        if (city) event.city = city;
        if (date) event.date = date;
        if (participantLimit) event.participantLimit = participantLimit;
        if (tags) event.tags = tags;

        await event.save();

        res.json(event);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
}

// @route   PUT /api/events/:id/leave
// @desc    Allow a user to leave an event
// @access  Private
exports.leaveEvent=async(req, res)=>{
    try{
        const event=await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({msg:"Event not found"});
        }

        const userId=req.user.id;

        if(!event.participants.includes(userId)){
            return res.status(400).json({msg:"You are not a participant of this event"});
        }

        const userIndex=event.participants.indexOf(userId);
        event.participants.splice(userIndex, 1);
        await event.save();

        res.json({msg:"you have left the event"});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}