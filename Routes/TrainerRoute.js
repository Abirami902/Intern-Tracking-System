import express from 'express';
import multer from 'multer';
import { assignIntern, ViewAnswerById, ViewTask, SaveMark } from '../Controller/Trainer.js';

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/assign', upload.single('document'), assignIntern);
router.get('/viewtask', ViewTask);
router.get('/viewanswer',ViewAnswerById)
router.post('/savemark',SaveMark)

export default router;
