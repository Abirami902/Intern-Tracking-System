import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CompletedTask = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/viewtask/viewtask`)
      .then(response => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);


  return (
    <>
    <Container className="mt-4">
      <h2>Tasks</h2>
      <Row>
        {tasks.map((task) => (
          <Col key={task._id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{task.question}</Card.Title>
                <Card.Text>
                  <strong>Deadline:</strong> {task.deadline}
                </Card.Text>
                <Link to={`/intern/intern2/${task._id}`}>
                <Button variant="primary">
                  View
                </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    
    <div className="pagination">
    <Link to="/admin" className='fw-bold'>prev</Link>
    <Link to="/admin/">1</Link>
    <Link to="/admin/admin1">2</Link>
    <Link to="/admin/admin2">3</Link>
    <Link to="/admin/admin3">4</Link>
    <Link to="" className='text-dark fw-bold'>Next</Link>
  </div>
   </>
  );
};

export default CompletedTask;