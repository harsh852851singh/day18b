const express =require("express");
require("dotenv").config();
const chatRoutes=require("./routes/chatRoutes");
const connectDB =require("./config/db");
const cors =require("cors");
const app =express();
connectDB();
app.use(cors());
app.use(express.json());
app.get("/",()=>{
    res.send("Students Doubt Solver Is Running");
});
app.use("/api/chats",chatRoutes);
const PORT =process.env.PORT || 5001;
app.listen(PORT,()=> {
    //console.log("Server Started at",+PORT);
    console.log(`Server Started at ${PORT}`);
});