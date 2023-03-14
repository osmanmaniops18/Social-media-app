import express from "express";
import { verfiedUser } from "../contrller/middleware/authentecation.js";
import {getFeedPosts,getUserPosts,likesPost} from "../contrller/posts.js";



const router=express.Router();


router.get("/",verfiedUser,getFeedPosts);
router.get("/:id/posts",verfiedUser,getUserPosts);
router.patch("/:id/like",verfiedUser,likesPost);




export default router;
