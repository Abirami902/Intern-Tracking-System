import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [login, setLogin] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/auth/login', login);
      toast.success('Logged in successfully');

      const userType = response.data.userType;
      if (userType === 'Admin') {
        navigate('/admin');
      } else if (userType === 'trainer') {
        navigate('/trainer/trainer1');
      } else if (userType === 'intern') {
        navigate('/intern/intern1');
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || 'Invalid login');
    } finally {
      setLoading(false);
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
                <p className='mt-5 fw-bold fs-3'>LOGIN</p>
                <Button className="bg-light" variant="secondary" style={{ marginTop: "120px" }}>
                  <span className='text-dark fw-bold fs-6'>SIGN UP</span>
                </Button>
              </div>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center'>
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <div className="mt-2">
                        <input
                          id="uname"
                          name="username"
                          type="text"
                          placeholder='User Name'
                          autoComplete="username"
                          required
                          className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder='Password'
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <Button type="submit" style={{ backgroundColor: 'rgb(43, 43, 82)', color: 'white' }} className="btn mt-5 ms-5">
                      {loading ? 'Logging in...' : 'Log in'}
                    </Button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Login;
