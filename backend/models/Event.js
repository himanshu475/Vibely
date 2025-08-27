const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trime:true,
    },

    description:{
        type:String,
        required:true,
    },

    category:{
        type:String,
        required:true,
        enum:['Sports', 'Study', 'Arts', 'Music', 'Hangout', 'Other'],
    },
    city:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    participantLimit:{
        type:Number,
        required:true,
        min:1,
    },
    tags:[
        {
            type:String,
            trim:true,
        },
    ],
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    ],

    joinRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
    ],

    status:{
        type:String,
        enum:['open', 'full', 'closed', 'upcoming', 'completed'],
        default:'open',
    },

},{
    timestamps:true,
});

const Event=mongoose.model("Event", eventSchema);

module.exports=Event;