import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from './Navbar'; // Import your custom Navbar component
import Home from './Home';
import Login from './Login';
import RegisterI from './Intern/RegisterI';
import RegisterT from './Trainer/RegisterT';

import Adminnav from './Admin/Adminnav';
import Addcourse from './Admin/Addcourse';
import Addtrainer from './Admin/Addtrainer';
import Acceptcourse from './Admin/Acceptcourse';
import AssignTrainer from './Admin/AssignTrainer';

import TrainerNav from './Trainer/TrainerNav';
import Addintern from './Trainer/Addintern';
import Taskview from './Trainer/Taskview';
import Markadd from './Trainer/Markadd';
import Design from './Trainer/Design';

import InternNav from './Intern/InternNav';
import DesignI from './Intern/DesignI';
import CompletedTask from './Intern/CompletedTask';
import Question from './Intern/Question';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Internregister" element={<RegisterI />} />
          <Route path="trainerregister" element={<RegisterT />} /> 
        </Route>

        {/* Done */}

        <Route path="/admin" element={<Adminnav />}>
        <Route index element={<Addcourse />} />
        <Route path="admin1" element={<Addtrainer />} />
        <Route path="admin2" element={<Acceptcourse />} />
        <Route path="admin3" element={<AssignTrainer />} />
</Route>
     
     {/* Done */}

        <Route path="/trainer" element={<TrainerNav />}>
        <Route path="trainer1" element={<Addintern />} />
        <Route path="trainer2" element={<Taskview />} />
        <Route path="trainer3" element={<Markadd />} />
        <Route path="trainer4" element={<Design />} /> 
         </Route>


        <Route path="/intern" element={<InternNav />}>
        <Route path="intern1" element={<CompletedTask />} /> 
        <Route path="intern2/:id" element={< Question/>} /> 
        <Route path="intern3" element={< DesignI/>} /> 

        {/* done */}

        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
