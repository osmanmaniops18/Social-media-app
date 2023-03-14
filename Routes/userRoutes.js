import express from "express";
import { verfiedUser } from "../contrller/middleware/authentecation.js";
import { getUser,getUserFriends,addRemoveFriends } from "../contrller/user.js";

const router=express.Router();


router.get("/:id",verfiedUser,getUser);
router.get("/:id/friends",verfiedUser,getUserFriends);
router.patch("/:id/:friendId",verfiedUser,addRemoveFriends);


export default router;