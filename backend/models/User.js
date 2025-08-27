const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trime:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    city:{
        type:String,
        required:true,
        trim:true,
    },
    bio:{
        type:String,
        default:'',

    },
    hobbies:[
        {
            type:String,
            trim:true,
        },
    ],
    googleId:{
        type:String,
        sparse:true,
    },
},{
    timestamps:true,
});

const User=mongoose.model('User', userSchema);

module.exports=User;


