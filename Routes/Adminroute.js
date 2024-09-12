import express from "express";
import { AcceptTrainer, AssignStudent, RejectTrainer, viewIntern, viewTrainer,viewcourse ,AddCourse,
     DeleteCourses, upload, updatecourse,AssignTrainer,RejectIntern,AcceptIntern} from "../Controller/Admin.js";

const router=express.Router();

router.get('/viewTrainer',viewTrainer);
router.post('/accept/:id',AcceptTrainer)
router.post('/reject/:id',RejectTrainer)
router.post('/assign/:id',AssignStudent)

router.get('/viewIntern',viewIntern)
router.post('/Accept/:id',AcceptIntern)
router.post('/Reject/:id',RejectIntern)
router.get('/assign',AssignTrainer)


router.get('/Course',viewcourse)
router.post('/addCourse',upload.single('syllabus'), AddCourse)
router.put('/updatecourse/:id', upload.single('syllabus'),updatecourse);
router.delete('/delete/:id',DeleteCourses)





export default router;