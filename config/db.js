const mongoose =require("mongoose")

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MOngo DB connected");

    }
    catch(err){
        console.log("Unable to connect Mongo DB",err)
    }
};

module.exports =connectDB;