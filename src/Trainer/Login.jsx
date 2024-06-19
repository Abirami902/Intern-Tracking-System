import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

const Login = () => {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center' style={{backgroundColor:'rgb(43, 43, 82'}}>
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
        <Row className='w-100'>
          <Col md={6} className="d-flex flex-column  p-5 align-items-center text-center text-white" style={{backgroundColor:'rgb(43, 43, 82',height:'500px'}}>
            <Image src="Ellipse 4.png" className="rounded-circle h-10 w-10" alt="" />
            <div className=''>
              <p className='fw-bold fs-3'>LOGIN</p>
              <Button className="mb-2 bg-light" variant="secondary" style={{marginTop:"140px"}}><span className='text-dark fw-bold fs-6'>SIGN UP</span></Button>
            </div>
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center' style={{ backgroundColor: '' }}>
            <p style={{ color: 'white' }}>hyghjkl;kjl</p>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Login;
