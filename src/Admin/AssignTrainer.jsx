import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const AssignTrainer = () => {
  const [assigntrainer, setAssignTrainer] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInternId, setSelectedInternId] = useState(null);
  const [selectedTrainerId, setSelectedTrainerId] = useState('');

  useEffect(() => {
    const savedAssignTrainer = localStorage.getItem('assigntrainer');
    const savedTrainers = localStorage.getItem('trainers');

    if (savedAssignTrainer && savedTrainers) {
      setAssignTrainer(JSON.parse(savedAssignTrainer));
      setTrainers(JSON.parse(savedTrainers));
    } else {
      fetchAssignTrainer();
      fetchTrainers();
    }
  }, []);

  const fetchAssignTrainer = async () => {
    try {
      const response = await axios.get('http://localhost:4000/viewIntern/viewIntern');
      console.log('Fetched Assign Trainer Data:', response.data);
      setAssignTrainer(response.data);
      localStorage.setItem('assigntrainer', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching assigntrainer:', error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/viewTrainer/viewTrainer');
      console.log('Fetched Trainers Data:', response.data);
      setTrainers(response.data);
      localStorage.setItem('trainers', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:4000/viewIntern/Accept/${id}`);
      const updatedAssignTrainer = assigntrainer.map((intern) =>
        intern._id === id ? { ...intern, status: 'ACCEPTED' } : intern
      );
      setAssignTrainer(updatedAssignTrainer);
      localStorage.setItem('assigntrainer', JSON.stringify(updatedAssignTrainer));
    } catch (error) {
      console.error('Error accepting intern:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:4000/viewIntern/Reject/${id}`);
      const updatedAssignTrainer = assigntrainer.map((intern) =>
        intern._id === id ? { ...intern, status: 'REJECTED' } : intern
      );
      setAssignTrainer(updatedAssignTrainer);
      localStorage.setItem('assigntrainer', JSON.stringify(updatedAssignTrainer));
    } catch (error) {
      console.error('Error rejecting intern:', error);
    }
  };

  const handleAssign = async () => {
    try {
      const trainer = trainers.find((t) => t._id === selectedTrainerId);
      if (!trainer) {
        console.error('Trainer not found');
        return;
      }

      await axios.post(`http://localhost:4000/viewIntern/assign/${selectedInternId}`, {
        trainerId: selectedTrainerId,
      });

      const updatedAssignTrainer = assigntrainer.map((intern) =>
        intern._id === selectedInternId ? { ...intern, status: 'ASSIGNED', trainer } : intern
      );
      setAssignTrainer(updatedAssignTrainer);
      localStorage.setItem('assigntrainer', JSON.stringify(updatedAssignTrainer));
      setShowModal(false);
    } catch (error) {
      console.error('Error assigning trainer:', error);
    }
  };

  const handleShowModal = (internId) => {
    setSelectedInternId(internId);
    setShowModal(true);
  };

  return (

    <>
    <div style={{ marginTop: '-10px' }} className='ms-5'>
      <Container>
        <h2 className='mt-5'>INTERN</h2>
        <Table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>COURSE</th>
              <th>DATE JOINED</th>
              <th>FEES PAID</th>
              <th>STATUS</th>
              <th>TRAINER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {assigntrainer.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.datejoined}</td>
                <td>{item.feesPaid ? 'Yes' : 'No'}</td>
                <td>{item.status}</td>
                <td>{item.trainer ? item.trainer.name : 'Not Assigned'}</td>
                <td>
                  {item.status !== 'REJECTED' && (
                    <>
                      {!item.trainer && item.status !== 'ACCEPTED' && (
                        <Button variant='warning' className='me-2' onClick={() => handleAccept(item._id)}>
                          ACCEPT
                        </Button>
                      )}
                      {item.status !== 'ACCEPTED' && (
                        <Button variant='danger' className='me-2' onClick={() => handleReject(item._id)}>
                          REJECT
                        </Button>
                      )}
                      <Button variant='primary' onClick={() => handleShowModal(item._id)}>
                        ASSIGN
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Trainer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId='formTrainerSelect'>
                <Form.Label>Select Trainer</Form.Label>
                <Form.Control
                  as='select'
                  value={selectedTrainerId}
                  onChange={(e) => setSelectedTrainerId(e.target.value)}
                >
                  <option value=''>Select a trainer</option>
                  {trainers.map((trainer) => (
                    <option key={trainer._id} value={trainer._id}>
                      {trainer.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant='primary' onClick={handleAssign}>
              Assign Trainer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
    
    <div className="pagination">
<Link to="/admin" className='fw-bold'>prev</Link>
<Link to="/admin">1</Link>
<Link to="/admin/admin1">2</Link>
<Link to="/admin/admin2">3</Link>
<Link to="/admin/admin3">4</Link>
<Link to="/trainer" className='text-dark fw-bold'>Next</Link>
</div>
</>

  );
};

export default AssignTrainer;
