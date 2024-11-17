// src/LoginPage.jsx
import React, { useState } from 'react';
import './page3.css'; // Import the same CSS file for styling
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const generateAccountId = () => {
    return [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Generate account ID
    const accountId = generateAccountId();

    // Here you would typically send the username, password, and accountId to your server
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Generated Account ID:', accountId);

    // Redirect to a different page after successful login (e.g., dashboard)
    navigate('/dashboard'); // Change this to your desired route
  };

  return (
    <div className="page3-container">
      <h1>Create Your Account</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="select-button">Continue</button>
      </form>
    </div>
  );
};

export default LoginPage;