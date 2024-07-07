import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Logged in successfully!');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 mt-4">
      <div className="bg-white p-4 rounded-lg shadow-lg w-100" style={{ maxWidth: '350px' }}>
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </Form.Group>
          <Button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 w-100 transition-colors duration-300"
          >
            Sign In
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
