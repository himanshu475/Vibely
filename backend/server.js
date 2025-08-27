require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const authRoutes=require('./routes/auth');
const eventRoutes=require('./routes/events');


const app=express();

app.use(express.json());


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);



//Database conenction
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('MongoDB connected successfully');
    })
    .catch(err=>{
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const PORT=process.env.PORT||5000;

app.listen(PORT, ()=>{
    console.log(`Server is runningg on port ${PORT}`);
});