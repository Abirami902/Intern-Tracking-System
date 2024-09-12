import { Button, Container, Form, Spinner, Table, Toast } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Acceptcourse = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = 'http://localhost:4000/viewIntern/viewIntern'; // API endpoint to fetch trainers

  useEffect(() => {
    const savedTrainers = localStorage.getItem('trainers');
    if (savedTrainers) {
      setTrainers(JSON.parse(savedTrainers));
    } else {
      fetchTrainers();
    }
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(apiUrl);
      
    } catch (error) {
      console.error('Error fetching Interns:', error);
    } 
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:4000/viewTrainer/accept/${id}`);
      const updatedTrainers = trainers.map((trainer) =>
        trainer._id === id ? { ...trainer, status: 'ACCEPTED' } : trainer
      );
      setTrainers(updatedTrainers);
      localStorage.setItem('trainers', JSON.stringify(updatedTrainers));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error accepting trainer:', error);
      setShowError(true);
      setErrorMessage('Error accepting trainer. Please try again.');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:4000/viewTrainer/reject/${id}`);
      const updatedTrainers = trainers.map((trainer) =>
        trainer._id === id ? { ...trainer, status: 'REJECTED' } : trainer
      );
      setTrainers(updatedTrainers);
      localStorage.setItem('trainers', JSON.stringify(updatedTrainers));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error rejecting trainer:', error);
      setShowError(true);
      setErrorMessage('Error rejecting trainer. Please try again.');
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Form>
          <Form.Group controlId="courseName">
            <Form.Label className="fw-bold fs-3">INTERNS</Form.Label>
          </Form.Group>
        </Form>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Table className="mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer._id}>
                  <td>{trainer.name}</td>
                  <td>{trainer.course}</td>
                  <td>{trainer.contact}</td>
                  <td>{trainer.email}</td>
                  <td className={`text-${trainer.status === 'ACCEPTED' ? 'primary' : 'dark'}`}>
                    {trainer.status}
                  </td>
                  <td>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleAccept(trainer._id)}
                      disabled={trainer.status === 'ACCEPTED'}
                    >
                      ACCEPT
                    </Button>
                    <Button
                      variant="danger"
                      className="me-2"
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
        )}
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

export default Acceptcourse;
