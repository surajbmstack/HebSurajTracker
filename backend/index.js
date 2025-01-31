const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors=require('cors')
const expenseRoutes=require('./routes/expenseRoutes')
const userRoutes=require('./routes/userRoutes')
const bodyParser = require('body-parser');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongodb connected")
    })
    .catch(err => console.error(err));
   
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
   // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true,
    origin: true,
   
}))

app.use('/api/user',userRoutes)
app.use('/api/expense',expenseRoutes)

app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})