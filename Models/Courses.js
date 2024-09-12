import mongoose from "mongoose";

const Courseschema=new mongoose.Schema({
    Coursename: {
        type: String,
        required: true
    },
    syllabus: {
        type: String,
        required: true

    }
})

const Course=mongoose.model('Course',Courseschema)
export default Course