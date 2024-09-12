import Assign from '../Models/Assign.js';
import Answer from '../Models/Answer.js';
import Marks from '../Models/Marks.js';  // Ensure this model is defined correctly

export const assignIntern = async (req, res) => {
  const { question, deadline, notes, link, internIds } = req.body;
  const document = req.file;

  try {
    const parsedInternIds = JSON.parse(internIds);

    const newAssign = new Assign({
      question,
      deadline,
      notes,
      link,
      documentPath: document ? document.path : '',
      internId: parsedInternIds
    });

    await newAssign.save();
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const ViewTask = async (req, res) => {
  try {
    const tasks = await Assign.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const ViewAnswerById = async (req, res) => {
  try {
    const answers = await Answer.find(); 
    res.json(answers);
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const SaveMark = async (req, res) => {
  try {
    const { marks } = req.body;

    // Check for the presence of all required fields
    if (!Array.isArray(marks) || marks.some(mark => !mark.internId || !mark.questionId || mark.marks === undefined)) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Save each mark
    await Promise.all(marks.map(async (mark) => {
      const newMark = new Marks({
        internId: mark.internId,
        questionId: mark.questionId,
        marks: mark.marks,
        comments: mark.comments || ''
      });
      await newMark.save();
    }));

    res.status(200).json({ message: 'Marks saved successfully' });
  } catch (error) {
    console.error('Error saving marks:', error);
    res.status(500).json({ error: 'Failed to save marks' });
  }
};
