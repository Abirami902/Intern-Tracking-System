import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Outlet } from 'react-router-dom';
const TrainerNav = () => {
  return (
    <>
    <div>
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid ">
    <a class="navbar-brand" href="#">Welcome Trainer</a>
  </div>
</nav>
</nav>
    </div>
    <div className='d-flex'>
<Nav defaultActiveKey="/home" className="flex-column fs-4  custom-nav">
        <Nav.Link href="/intern/intern3">Interns</Nav.Link>
        <Nav.Link href="/trainer/trainer3">Tasks</Nav.Link>
      </Nav>

      
  <Outlet/>
    </div>
    </>
  )
}

export default TrainerNav
