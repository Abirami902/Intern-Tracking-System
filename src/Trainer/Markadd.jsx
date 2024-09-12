import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TrainerViewtask = () => {
  const [tasks, setTasks] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/viewanswer/viewanswer');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleMarkChange = (taskId, internId, mark) => {
    setMarks({
      ...marks,
      [taskId]: {
        ...marks[taskId],
        [internId]: mark,
      },
    });
  };

  const handleSaveMarks = async () => {
    const marksArray = Object.keys(marks).flatMap((taskId) => {
      return Object.keys(marks[taskId]).map((internId) => ({
        internId,
        questionId: taskId,
        marks: Number(marks[taskId][internId]), // Ensure marks is a number
      }));
    });
    try {
      await axios.post('http://localhost:4000/answer/savemark', { marks: marksArray });
      console.log('Marks saved successfully');
    } catch (error) {
      console.error('Error saving marks:', error);
    }
  };

  return (

    <>
    <div className="mx-auto mt-5">
      <h2>View Tasks and Answers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task</th>
            <th>Answer</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => (
            <tr key={item._id}>
              <td>{item.question}</td>
              <td>{item.answer}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter mark"
                  value={marks[item._id]?.[item.internId] || ''}
                  onChange={(e) => handleMarkChange(item._id, item.internId, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleSaveMarks}>Save Marks</Button>
    </div>

    
<div className="pagination" style={{marginTop:'750px'}}>
<Link to="/trainer" className='fw-bold'>prev</Link>
<Link to="/trainer/trainer1">1</Link>
<Link to="/trainer/trainer2">2</Link>
<Link to="/trainer/trainer3">3</Link>
<Link to="/trainer/trainer4">4</Link>
<Link to="" className='text-dark fw-bold'>Next</Link>
</div>

</>
  );
};

export default TrainerViewtask;
