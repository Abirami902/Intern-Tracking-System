import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Addtrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const apiUrl = 'http://localhost:4000/viewTrainer/viewTrainer'; // API endpoint to fetch trainers

  useEffect(() => {
    // Fetch trainer data from API
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTrainers(response.data); // Assuming API response contains an array of trainers
      } catch (error) {
        console.error('Error fetching trainers:', error);
        // Handle error state if needed
      }
    };

    fetchTrainers();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:4000/viewTrainer/accept/${id}`);
      setTrainers((prev) =>
        prev.map((trainer) => (trainer._id === id ? { ...trainer, status: 'ACCEPTED' } : trainer))
      );
    } catch (error) {
      console.error('Error accepting trainer:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:4000/viewTrainer/reject/${id}`);
      setTrainers((prev) =>
        prev.map((trainer) => (trainer._id === id ? { ...trainer, status: 'REJECTED' } : trainer))
      );
    } catch (error) {
      console.error('Error rejecting trainer:', error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Form>
          <Form.Group controlId="courseName">
            <Form.Label className='fw-bold fs-3'>Trainer</Form.Label>
          </Form.Group>
        </Form>
        <Table striped hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Date Joined</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map(trainer => (
              <tr key={trainer._id}>
                <td>{trainer.name}</td>
                <td>{trainer.course}</td>
                <td>{trainer.datejoined}</td>
                <td className={`text-${trainer.status === 'ACCEPTED' ? 'success' : 'danger'}`}>
                  {trainer.status}
                </td>
                <td>
                  <Button
                    variant='warning'
                    className='me-2'
                    onClick={() => handleAccept(trainer._id)}
                    disabled={trainer.status === 'ACCEPTED'}
                  >
                    ACCEPT
                  </Button>
                  <Button
                    variant='danger'
                    className='me-2'
                    onClick={() => handleReject(trainer._id)}
                    disabled={trainer.status === 'REJECTED'}
                  >
                    REJECT
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Pagination can be added here if needed */}

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
}

export default Addtrainer;
