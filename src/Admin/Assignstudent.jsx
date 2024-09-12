import { Button, Container, Form, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Assignstudent = () => {
  const [student, setStudent] = useState([]);
  const [trainer, setTrainer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const apiUrl = 'http://localhost:4000/viewTrainer/viewTrainer';
  const internsApiUrl = 'http://localhost:4000/interns'; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(apiUrl);
        const storedData = JSON.parse(localStorage.getItem('trainerData')) || response.data;
        setStudent(storedData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchInterns = async () => {
      try {
        const response = await axios.get(internsApiUrl);
        setTrainer(response.data); 
      } catch (error) {
        console.error('Error fetching interns:', error);
      }
    };

    fetchStudents();
    fetchInterns();
  }, []); 

  const handleStudentSelect = async (internId) => {
    try {
      await axios.post(`http://localhost:4000/viewIntern/viewIntern/${selectedTrainerId}`, { internId });
      const updatedStudent = student.map((trainer) => {
        if (trainer._id === selectedTrainerId) {
          return {
            ...trainer,
            studentsAssigned: (trainer.studentsAssigned || 0) + 1,
          };
        }
        return trainer;
      });
      setStudent(updatedStudent);
      localStorage.setItem('trainerData', JSON.stringify(updatedStudent)); 
      setShowModal(false);
      navigate('/admin/admin5'); 
    } catch (error) {
      console.error('Error assigning Student:', error);
    }
  };

  const handleAssignClick = (trainerId) => {
    setSelectedTrainerId(trainerId);
    setShowModal(true);
  };

  return (
    <>
      <Container className="mt-5">
        <Form>
          <Form.Group controlId="courseName">
            <Form.Label className='fw-bold fs-3'>Trainer</Form.Label>
          </Form.Group>
        </Form>
        <Table className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Date Joined</th>
              <th>Students Assigned</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {student.map(trainer => (
              <tr key={trainer._id}>
                <td>{trainer.name}</td>
                <td>{trainer.course}</td>
                <td>{trainer.datejoined}</td>
                <td>{trainer.studentsAssigned || 0}</td>
                <td>
                  <Button
                    variant='primary'
                    className='me-2'
                    onClick={() => handleAssignClick(trainer._id)}
                  >
                    ASSIGN
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

          <Table>
           
            <tbody>
              {trainer.map((trainer) => (
                <tr key={trainer._id}>
                  <td>{trainer.name}</td>
                  <td>
                    <Button onClick={() => handleStudentSelect(trainer._id)}>Select</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
   
      <div className="pagination">
        <a href="#" className='fw-bold'>Prev</a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#" className='text-dark fw-bold'>Next</a>
      </div>
    </>
  );
};

export default Assignstudent;
