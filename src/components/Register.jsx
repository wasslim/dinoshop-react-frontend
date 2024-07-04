import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
        email,
        password,
        firstName,
        lastName,
      });
      // Handle register success (store token, redirect, etc.)
      localStorage.setItem('token', response.data.token);
      alert('Registered successfully!');
    } catch (err) {
      setError('Error registering user');
    }
  };
  

  return (
    <div className="container mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
