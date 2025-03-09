import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://prafullshimpi2829:Prafull1234@mern-food.hckrt.mongodb.net/?retryWrites=true&w=majority&appName=mern-food').then(()=>{
       console.log('DB connected') ;
    })
}

