import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './LSPage.css'

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      console.log('Login successful');
      setIsLoggedIn(true); 
      navigate('/add-page'); 
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Login</h1>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              className="form-control mb-3 custom-input" 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              className="form-control mb-3 custom-input" 
            />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
