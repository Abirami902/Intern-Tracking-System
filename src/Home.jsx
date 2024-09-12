import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Image, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const Home = () => {
  return (
  <>
     {/* Image Container */}
      <div className="position-relative bgcolor" >
        </div>
        <div>
        <Link to='/login'>
        <Button type="button" style={{ backgroundColor: 'darkcyan', color: 'white', width: '200px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="loghome fw-bold">LOGIN</Button>
        </Link>
      </div>
      
      <div className="text-center">
          <p className='course  fw-bold'>Our Courses</p>
        </div>
      {/* Courses Container  */}
     <Container>
<div className='div1'>
        <Row className="row-cols-1 row-cols-md-4 g-4">
          <Col>
            <Card className="h-100 ">
              <Card.Img variant="top" src="mern.png" />
              <Card.Body>
                <Card.Title>MERN</Card.Title>
                <Card.Text>Duration: 6 Months</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 ">
              <Card.Img variant="top" src="flutter.png" />
              <Card.Body>
                <Card.Title>Flutter</Card.Title>
                <Card.Text>Duration: 6 Months</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 ">
              <Card.Img variant="top" src="mean.jpg" />
              <Card.Body>
                <Card.Title>MEAN</Card.Title>
                <Card.Text>Duration: 6 Months</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Img variant="top" src="py.png" />
              <Card.Body>
                <Card.Title>PYTHON</Card.Title>
                <Card.Text>Duration: 6 Months</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

         <Row className="row-cols-1 row-cols-md-4 g-4">
          <Col>
            <Card className="h-100 ">
              <Card.Img variant="top" src="ds.jpeg" />
              <Card.Body>
                <Card.Title>DS</Card.Title>
                <Card.Text>Duration: 6 Months</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 ">
              <Card.Img variant="top" src="sql.webp" />
              <Card.Body>
                <Card.Title>SQL</Card.Title>
                <Card.Text>Duration: 6 Months</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 ">
              <Card.Img variant="top" src="django.jpeg" />
              <Card.Body>
                <Card.Title>DJANGO</Card.Title>
                <Card.Text>Duration: 6 Months</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Img variant="top" src="php.png" />
              <Card.Body>
                <Card.Title>PHP</Card.Title>
                <Card.Text>Duration: 6 Months</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </div> 
        </Container>
 
      <div className=" mt-5 text-center">
          <p className='course1  fw-bold'>Our Trainers</p>
        </div>

      <div className='d-flex trainer'>
        <div class="mt-5 card mb-3 ms-5" style={{width: '260px' ,height: '150px'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="vini.jpg" class="mt-2 img-fluid rounded-circle h-75 w-125" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold fS-3 ">VINISHA .T</h5>
        <p class="card-text fS-6">MANAGER HR & TALENT ACQUISITION</p>
      </div>
    </div>
  </div>
</div>

<div class="mt-5 card mb-3 ms-5" style={{width: '260px' ,height: '150px'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="athi.jpg" class="mt-2 img-fluid rounded-circle h-75 w-100" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold fS-3 ">SNEHA .E</h5>
        <p class="card-text fS-6">OPERATION MANAGER</p>
      </div>
    </div>
  </div>
</div>

<div class="mt-5 card mb-3 ms-5" style={{width: '260px' ,height: '150px'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="anaga.jpg" class="mt-2 img-fluid rounded-circle h-75 w-125" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold fS-3 ">Anagha AP</h5>
        <p class="card-text fS-6">Internship cordinator</p>
      </div>
    </div>
  </div>
</div>


<div class="mt-5 card mb-3 ms-5" style={{width: '260px' ,height: '150px'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="anju.jpeg" class="mt-2 img-fluid rounded-circle h-75 w-125" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold fS-3 ">Anjusha AP</h5>
        <p class="card-text fS-6">Mern stack developer</p>
      </div>
    </div>
  </div>
</div>

<div class="mt-5 card mb-3 ms-5" style={{width: '260px' ,height: '150px'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="aswathi.jpg" class="mt-2 img-fluid rounded-circle h-75 w-125" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold fS-3 ">ASWATHI .T</h5>
        <p class="card-text fS-6">PROFESSIONAL DEVELOPMENT COORDINATOR</p>
      </div>
    </div>
  </div>
</div>
    </div> 
    </>
  );
};

export default Home;
