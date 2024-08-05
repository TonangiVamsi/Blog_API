import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/user-routes.js"
import blogrouter from './routes/blog-routes.js';

const app=express()

app.use(express.json())
app.use('/api/user',userRouter);

app.use('/api/blog',blogrouter);

mongoose.connect('mongodb+srv://vamsitonagi9:blog9121@cluster0.cujm3he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>app.listen(3000))
    .then(()=>{
        console.log('connected to database')
    })
    .catch((err)=>{
        console.log(err)
    });

