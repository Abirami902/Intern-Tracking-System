import mongoose from "mongoose";

const Loginschema=new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String
    },
    userType:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId
    }
})

const Login=mongoose.model('login',Loginschema)
export default Login