import RegisterT from "../Models/RegisterT.js";
import RegisterI from "../Models/RegisterI.js";
import multer from 'multer'
import Course from "../Models/Courses.js";

//multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

export const upload = multer({ storage: storage });



//view trainer

export const viewTrainer = async(req,res)=>{
    try{
        const trainer=await RegisterT.find();
        res.json(trainer);
    }
    catch(e)
{
    res.status(500).json({message:e.message});
}};


//view intern

export const viewIntern = async(req,res)=>{
  try{
      const intern=await RegisterI.find();
      res.json(intern);
  }
  catch(e)
{
  res.status(500).json({message:e.message});
}};


//accept trainer

export const AcceptTrainer = async (req, res) => {
    try {
      const trainer = await RegisterT.findByIdAndUpdate(req.params.id, { status: 'ACCEPTED' }, { new: true });
      console.log(trainer);
      res.json(trainer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //reject trainer
  
  export const RejectTrainer = async (req, res) => {
    try {
      const trainer = await RegisterT.findByIdAndUpdate(req.params.id, { status: 'REJECTED' }, { new: true });
      res.json(trainer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //assign student

  export const AssignStudent = async (req, res) => {
    try {
      const student = await RegisterI.findByIdAndUpdate(req.params.id, { status: 'ASSIGNED',trainerId:req.body.trainerId }, { new: true });
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Course.js

export const AddCourse = async (req, res) => {
  try {
    const { Coursename } = req.body;
    const syllabus = req.file.filename;

    const newCourse = new Course({ Coursename, syllabus });
    await newCourse.save();

    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//view course

export const viewcourse = async (req, res) => {
  const { Coursename, syllabus } = req.body; 

  try {
   
    const student = await Course.find();

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

//update course

export const updatecourse = async (req, res) => {
  try {
    const { Coursename } = req.body;
    const syllabus = req.file ? req.file.path : req.body.syllabus;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { Coursename, syllabus },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};

//delete course

export const DeleteCourses = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//assign trainer

export const AssignTrainer = async (req, res) => {
  const { trainerId } = req.body;

  try {
    const intern = await RegisterI.findByIdAndUpdate(
      req.params.id,
      { trainerId, status: 'ASSIGNED' },
      { new: true }
    );

    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    res.status(200).json(intern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Accept intern


export const AcceptIntern = async (req, res) => {
  try {
    const intern = await RegisterI.findByIdAndUpdate(req.params.id, { status: 'ACCEPTED' }, { new: true });
    console.log(intern);
    res.json(intern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//accept intern

export const RejectIntern = async (req, res) => {
  try {
    const intern = await RegisterI.findByIdAndUpdate(req.params.id, { status: 'REJECTED' }, { new: true });
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
