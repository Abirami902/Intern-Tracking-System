import React from 'react'
import { Outlet } from 'react-router-dom'

const InternNav = () => {
  return (
    <div>
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Intern Home</a>
  </div>
</nav>
</nav>

<Outlet/>
    </div>
    
  
    
  )
}

export default InternNav
