import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    const role = event.target.value;
    if (role === 'admin') {
      navigate('/');
    } else if (role === 'intern') {
      navigate('/Internregister');
    } else if (role === 'trainer') {
      navigate('/trainerregister');
    }
  };

  return (
    <>
      <div>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold fs-3">ITS</a>
            <form className="d-flex" role="search">
              <select className="form-control fw-bold me-2" aria-label="Role Selection" onChange={handleRoleChange}>
                <option value="" disabled selected>Select Role</option>
                <option value="admin">ADMIN</option>
                <option value="intern">INTERN</option>
                <option value="trainer">TRAINER</option>
              </select>
            </form>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
