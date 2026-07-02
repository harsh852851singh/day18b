const OpenAI =require("openai");
const Chat =require("../models/Chat");
const { APIKeys } = require("openai/resources/admin/organization/projects/api-keys.js");
const { response } = require("express");

const askQuestion = async (req, res) =>{
    try{
        const client = new OpenAI({
            apiKey:process.env.OPENAI_KEY?.trim(),
            baseURL:"https://openrouter.ai/api/v1"
        });

        const { question } = req.body;
        if (!question){
            return res.status(401).json({
                success:false,
                message:"Please Write Question"
            })
        }

        const response= await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages:[
            {
                role:"system",
                content:"You are a helpfull teacher .Explain in simple hindEnglish with example"
            },
            {
                role:"user",
                content: question
            }
        ]
        });

        const answer =response.choices[0].message.content;
        const chat =await Chat.create({question,answer});

        res.status(201).json({
            success:true,
            message:"Answer Generated Scucessfully",
            data:chat
        });

    }
    catch(err){
        console.log("Unable to solve doubt",err);
        res.status(500).json({
            success:false,
            message:" Failed to generate answer",
            error:err.message
        });
    }
};

const getAllChats = async(req,res)=>{
    try{
        const chats =await Chat.find().sort({createdAt:-1});
        res.stauts(201).json({
            success:true,
            message:"All chats History",
            chats
        })
    }
    catch(err){
        console.log("Unable to Fetch chats",err);
        res.status(500).json({
            success:false,
            message:"Unable to Fetch chats history"
        });
    }
};

module.exports={askQuestion,getAllChats};