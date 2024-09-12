import mongoose from 'mongoose';

const Trainerschema = new mongoose.Schema({
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
    status: { type: String, default: 'PENDING' }
});

const RegisterT = mongoose.model('trainer', Trainerschema);
export default RegisterT;



