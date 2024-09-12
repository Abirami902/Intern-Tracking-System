import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Image, Row, Col } from 'react-bootstrap';

const RegisterT = () => {
  const [trainer, setTrainer] = useState({});
  const [photo, setphoto] = useState('');
  const [refresh, setRefresh] = useState(true);

  const handleChange = (event) => {
    setTrainer({ ...trainer, [event.target.name]: event.target.value });
  };

  console.log(trainer);


  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();

    formData.append('photo', photo);
    formData.append('name', trainer.name);
    formData.append('datejoined', trainer.datejoined);
    formData.append('course', trainer.course);
    formData.append('username', trainer.username);
    formData.append('password', trainer.password);
    formData.append('contact', trainer.contact);
    formData.append('email', trainer.email);

    console.log(formData,'iyyi');


    try {
      await axios.post('http://localhost:4000/auth/trainerregister', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    
      setphoto(null);
      setTrainer('');
      setRefresh(!refresh);
      toast.success('Trainer registered successfully');
    } catch (e) {
      toast.error(e || 'Error registering intern')
    }
  };

  return (
    <>
      <ToastContainer />

      <div className='vh-100 d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgb(43, 43, 82)' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
          <Row className='w-100'>
            <Col md={6} className="d-flex flex-column p-5 align-items-center text-center text-white" style={{ backgroundColor: 'rgb(43, 43, 82)', height: '500px' }}>
              <Image src="Ellipse 4.png" className="rounded-circle h-10 w-10" alt="" />
              <div>
                <p className='mt-2 fw-bold fs-3'>TRAINER REGISTER</p>
                <Button className="bg-light" variant="secondary" style={{ marginTop: "100px", width: "150px" }}>
                  <span className='text-dark fw-bold fs-6'>LOG IN</span>
                </Button>
              </div>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center'>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formName' className='mb-3'>
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Name'
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId='formDateJoined' className='mb-3'>
                  <Form.Control
                    type='date'
                    name='datejoined'
                    placeholder='Date joined'
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId='formPhoto' className='mb-3'>
                  <Form.Control
                    type='file'
                    name='photo'
                    placeholder='Photo'
                    onChange={((e) => { setphoto(e.target.files[0]) })}
                  />
                </Form.Group>

                <Form.Group controlId='formCourse' className='mb-3'>
                  <Form.Control
                    type='text'
                    name='course'
                    placeholder='Course'
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId='formUsername' className='mb-3'>
                  <Form.Control
                    type='text'
                    name='username'
                    placeholder='User Name'
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId='formPassword' className='mb-3'>
                  <Form.Control
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button type="submit" style={{ backgroundColor: 'rgb(43, 43, 82)', color: 'white', width: '200px' }} className="btn mt-5 ms-5">
                  REGISTER
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default RegisterT;
