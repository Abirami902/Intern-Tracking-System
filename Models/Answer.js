import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  internId: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Intern'
  }],
  question:{
    type: String
  }
});

const Answer = mongoose.model('Answer', AnswerSchema);

export default Answer;