import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Design = () => {
  const [trainers, setTrainer] = useState([]);
  const apiUrl = 'http://localhost:4000/viewTrainer/viewTrainer'; // API endpoint to fetch interns

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(apiUrl);
      setTrainer(response.data);
    } catch (error) {
      console.error('Error fetching Trainers:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="fw-bold fs-3">TRAINERS</h2>
      <div className="d-flex flex-wrap justify-content-start gap-4">
        {trainers.map((trainer) => (
          <Card key={trainer._id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://localhost:4000/uploads/${trainer.photo}`} alt={`${trainer.name}'s photo`} />
            <Card.Body>
              <Card.Title>{trainer.name}</Card.Title>
              <Link to={`/interns/${trainer._id}`}>
                <Button variant="primary">More Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Design;
