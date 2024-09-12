import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Course = () => {
  const [courseName, setCourseName] = useState('');
  const [syllabusFile, setSyllabusFile] = useState('');
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [interns, setInterns] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchTrainers();
    fetchInterns();
  }, [refresh]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Course/Course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/viewTrainer/viewTrainer');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const fetchInterns = async () => {
    try {
      const response = await axios.get('http://localhost:4000/viewIntern/viewIntern');
      setInterns(response.data);
    } catch (error) {
      console.error('Error fetching interns:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Coursename', courseName);
    formData.append('syllabus', syllabusFile);

    try {
      await axios.post('http://localhost:4000/Course/addCourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCourseName('');
      setSyllabusFile(null);
      setRefresh(!refresh);
      toast.success('Course added successfully');
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Error adding course');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/Course/delete/${id}`);
      setRefresh(!refresh);
      toast.success('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Error deleting course');
    }
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setCourseName(course.Coursename);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('Coursename', courseName);
    formData.append('syllabus', syllabusFile || currentCourse.syllabus);

    try {
      await axios.put(`http://localhost:4000/Course/updatecourse/${currentCourse._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModal(false);
      setCourseName('');
      setSyllabusFile(null);
      setRefresh(!refresh);
      toast.success('Course updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Error updating course');
    }
  };

  const getTrainerCount = (courseId) => {
    return trainers.filter(trainer => trainer.course === courseId).length;
  };

  const getInternCount = (courseId) => {
    return interns.filter(intern => intern.course === courseId).length;
  };

  return (
    <>
    <Container className='me-4 mt-5' style={{ marginTop: '-100px' }}>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="courseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            placeholder="Enter course name"
            className='w-100'
            name="Coursename"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="syllabusFile" className="mt-3">
          <Form.Label>Syllabus</Form.Label>
          <Form.Control
            type="file"
            className='w-100'
            name="syllabus"
            onChange={(e) => setSyllabusFile(e.target.files[0])}
          />
        </Form.Group>
        <Button type="submit" className="mt-3 bg-dark">
          Add
        </Button>
      </Form>

      <h2 className="mt-5">Courses</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Syllabus</th>
            <th>Number of Students</th>
            <th>Number of Trainers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.Coursename}</td>
              <td>{course.syllabus}</td>
              <td>{getInternCount(course._id)}</td>
              <td>{getTrainerCount(course._id)}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(course)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(course._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="courseNameEdit">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                placeholder="Enter course name"
                className='w-100'
                name="Coursename"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="syllabusFileEdit" className="mt-3">
              <Form.Label>Syllabus</Form.Label>
              <Form.Control
                type="file"
                className='w-100'
                name="syllabus"
                onChange={(e) => setSyllabusFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>

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

export default Course;
