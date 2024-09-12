import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const TrainerViewtask = () => {
  const [tasks, setTasks] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/answer/viewanswer');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleMarkChange = (id, mark) => {
    setMarks({ ...marks, [id]: mark });
  };

  // const handleSaveMarks = async () => {
  //   try {
  //     await axios.post('http://localhost:4000/answer/savemarks', marks);
  //     console.log('Marks saved successfully');
  //   } catch (error) {
  //     console.error('Error saving marks:', error);
  //   }
  // };

  return (
    <div className='mx-auto mt-5'>
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
                  value={marks[item._id] || ''}
                  onChange={(e) => handleMarkChange(item._id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <button onClick={handleSaveMarks}>Save Marks</button> */}
    </div>
  );
};

export default TrainerViewtask;