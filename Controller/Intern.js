import Assign from "../Models/Assign.js";
import Answer from "../Models/Answer.js";




export const ViewQuestion = async (req, res) => {
    const id = req.params.id;
  
    try {
      const task = await Assign.findById(id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.status(200).json(task);
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  export const SendAnswer = async (req, res) => {
    const { internId, answer,question } = req.body;
  
    try {
      const newAnswer = new Answer({ internId, answer,question });
      await newAnswer.save();
      res.status(201).json({ message: 'Answer saved successfully', data: newAnswer });
    } catch (error) {
      console.error('Error saving answer:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
 