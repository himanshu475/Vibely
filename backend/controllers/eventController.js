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
