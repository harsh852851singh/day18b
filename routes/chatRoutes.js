const express = require("express");
const { getAllChats, askQuestion } = require("../controllers/chatController");
const router = express.Router();

router.get("/",getAllChats);
router.post("/",askQuestion);

module.exports=router;