import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import  RegisterRoutes from './Routes/RegisterRoutes.js'
import viewTrainer from './Routes/Adminroute.js'
import viewIntern  from './Routes/Adminroute.js'
import viewcourse from './Routes/Adminroute.js'
import AddCourse from './Routes/Adminroute.js'

import assignRouter from './Routes/TrainerRoute.js'
import ViewTask from './Routes/TrainerRoute.js'

import  ViewQuestion  from './Routes/Internroute.js'
import  SendAnswer  from './Routes/Internroute.js'
import  ViewAnswerById from './Routes/TrainerRoute.js'
import  answer from './Routes/TrainerRoute.js'




const app = express()
app.use('/uploads', express.static('uploads'));
mongoose.connect('mongodb://127.0.0.1:27017/miniproject')
  .then(() => console.log('Connected!'));

  const db=mongoose.connection

  app.use(cors())
  app.use(express.json({limit:'50mb'}))

app.use('/auth',RegisterRoutes)
app.use('/viewTrainer',viewTrainer)
app.use('/viewIntern',viewIntern)
app.use('/Course',viewcourse)
app.use('/addCourse',AddCourse)

app.use('/assign', assignRouter); // Use the new routes
app.use('/viewtask',ViewTask)

app.use('/viewquestion',ViewQuestion);
app.use('/sendanswer',SendAnswer)
app.use('/viewanswer',ViewAnswerById)
app.use('/answer',answer)



app.listen(4000,()=>{
    console.log('running');
})