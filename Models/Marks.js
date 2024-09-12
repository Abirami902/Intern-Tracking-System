import mongoose from 'mongoose';

const MarksSchema = new mongoose.Schema({
    internId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intern', // Reference to the Intern model
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', // Reference to the Question model (assuming you have a Question model)
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    comments: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now // Automatically set the date when marks are saved
    }
});

const Marks = mongoose.model('Marks', MarksSchema);
export default Marks;
