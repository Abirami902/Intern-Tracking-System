import mongoose from 'mongoose';

const Internschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    datejoined: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'PENDING'
    },
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer' // Reference to the Trainer model
    }
});

const RegisterI = mongoose.model('intern', Internschema);
export default RegisterI;
