import mongoose from 'mongoose';

const Schema=mongoose.Schema

const userschema=new Schema({
    name:{
        type: String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    blogs:[{type:mongoose.Types.ObjectId , ref:"Blog",required:true}],
});

export default mongoose.model('User',userschema)

