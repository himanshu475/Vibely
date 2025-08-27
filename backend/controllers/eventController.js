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
