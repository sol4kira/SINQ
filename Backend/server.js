const express = require('express');
const cors = require('cors');
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
require('dotenv').config({ path: envFile });
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT||3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
        res.status(200).json({
        status: "OK"
    })
    });
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT,() =>{
            console.log(`Server running on port ${PORT}`)
        } ) 
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });