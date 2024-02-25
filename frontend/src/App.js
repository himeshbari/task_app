


import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/User/LoginForm';
import SignupPage from './pages/User/SignupForm';
import AddTaskPage from './pages/Task/AddTaskPage';
import GetTaskPage from './pages/Task/GetTaskPage';
import UpdateTaskPage from './pages/Task/UpdateTaskPage'; 
import Nav from './components/Nav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path="/add-page" element={<AddTaskPage />} />
            <Route path="/get-page" element={<GetTaskPage />} />
            <Route path="/update-task/:id" element={<UpdateTaskPage />} /> 
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
