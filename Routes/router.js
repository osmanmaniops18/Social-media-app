import express from "express";
import {login} from "../contrller/auth.js"

const router=express.Router();


router.post("/login",login);


export default router;