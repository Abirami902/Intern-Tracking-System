import express from "express";
import { SendAnswer, ViewQuestion} from "../Controller/Intern.js"


const router = express.Router();

router.get('/viewquestion/:id',ViewQuestion);
router.post('/sendanswer/:id',SendAnswer);



export default router;