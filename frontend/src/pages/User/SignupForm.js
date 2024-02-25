import React, { useState } from 'react';
import axios from 'axios';
import './LSPage.css'

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/signup', { username, password });
      console.log('Signup successful');
      // Clear input fields after successful signup
      setUsername('');
      setPassword('');
      // Set success message
      setSuccessMessage('Signup successful');
      // Clear any previous error message
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response.data.message);
      // Clear success message if any
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Signup</h1>
            <div className="mb-3">
              <input 
                type="text" 
                className={`form-control custom-input ${errorMessage && 'is-invalid'}`} 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
              />
            </div>
            <div className="mb-3">
              <input 
                type="password" 
                className={`form-control custom-input ${errorMessage && 'is-invalid'}`} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
              />
            </div>
            {errorMessage && <div className="message text-danger">{errorMessage}</div>}
            {successMessage && <div className="message text-success">{successMessage}</div>}
            <button 
              type="button" 
              className="btn btn-primary btn-block" 
              onClick={handleSignup}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
