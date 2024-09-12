import { Button, Container, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const apiUrl = 'http://localhost:4000/viewtask/viewtask';  // Updated URL

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTasks(response.data); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (

    <>
    <Container className="mt-5">
      <Form>
        <Form.Group controlId="courseName">
          <Form.Label className='fw-bold fs-3'>Task</Form.Label>
        </Form.Group>
      </Form>
      <Table striped hover className="mt-3">
        <thead>
          <tr>
            <th>Question</th>
            <th>Deadline</th>
            <th>Document</th>
            <th>Notes</th>
            <th>Link</th>
        
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.question}</td>
              <td>{new Date(task.deadline).toLocaleDateString()}</td>
              <td>
                {task.documentPath ? (
                  <a href={`http://localhost:4000/${task.documentPath}`} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                ) : 'No Document'}
              </td>
              <td>{task.notes}</td>
              <td><a href={task.link} target="_blank" rel="noopener noreferrer">{task.link}</a></td>
          

            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success">View answer</Button>
    </Container>

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
}

export default Task;
