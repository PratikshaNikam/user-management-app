const express=require('express');
const dotenv = require('dotenv'); 
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');

dotenv.config();  // Loads .env file variables

const app=express(); // Creates the express app, initializes the backend server and loads variables like PORT, MONGO_URI.
app.use(cors());  // Allows cross-origin requests (from React)
app.use(express.json());  // Automatically parses incoming JSON data

app.get('/',(req,res)=>{
    res.send('API is running...');
})

app.use('/api/users', userRoutes); 

const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})
.catch((err)=>{
    console.log(err);
})
    