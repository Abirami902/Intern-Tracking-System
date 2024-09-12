import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './Models/Courses.js';
import bcrypt from 'bcrypt'

const App = express()
App.use(express.json({limit:'50mb'}))

mongoose.connect('mongodb://127.0.0.1:27017/miniproject')
  .then(() => console.log('Connected!'));

  const db=mongoose.connection

  App.use(cors())

App.get('/login',(req,res)=>{
    res.json('login page')
})


App.post('/internregister',async (req,res)=>{
    try{

        console.log(req.body);
        let hashedPassword=await bcrypt.hash(req.body.password,10)
        console.log(hashedPassword);

        req.body={...req.body,password:hashedPassword}

        console.log(req.body,'new body');
        let newdata=new User(req.body)
        console.log(newdata)
        
        let response=await newdata.save()
        console.log(response);
        res.json(response)
    }
    catch(e){
        console.log(e);
        res.status(500).json(e.message)
    }
    let matchPassword=await bcrypt.compare(password,users.password)
    console.log(matchPassword);
    if(!matchPassword){
      return res.status(401).json('invalid username or password')
    }
 

})


App.post('/trainerregister',async (req,res)=>{
    try{

        console.log(req.body);
        let hashedPassword=await bcrypt.hash(req.body.password,10)
        console.log(hashedPassword);

        req.body={...req.body,password:hashedPassword}

        console.log(req.body,'new body');
        let newdata=new User(req.body)
        console.log(newdata)
        
        let response=await newdata.save()
        console.log(response);
        res.json(response)
    }
    catch(e){
        console.log(e);
        res.status(500).json(e.message)
    }

    let matchPassword=await bcrypt.compare(password,users.password)
    console.log(matchPassword);
    if(!matchPassword){
      return res.status(401).json('invalid username or password')
    }
 

})



App.post('/login',async (req,res)=>{
    console.log(req.body);
    const {username,password}=req.body
    let users=await User.findOne({username:username})
    console.log(users);
   if(!users){
     return res.status(401).json('invalid username or password')
   }
 
   let matchPassword=await bcrypt.compare(password,users.password)
   console.log(matchPassword);
   if(!matchPassword){
     return res.status(401).json('invalid username or password')
   }

 })




 App.listen(4000,()=>{
    console.log('running');
})
