import express from "express";
import { InternRegister, Logined, TrainerRegister, adminRegister} from "../Controller/auth.js";
import { upload } from "../Controller/Admin.js";


const router=express.Router();

router.post('/trainerRegister',upload.single('photo'),TrainerRegister)
router.post('/internRegister',upload.single('photo'), InternRegister)
router.post('/adminreg',adminRegister)
router.post('/login',Logined)


export default router;