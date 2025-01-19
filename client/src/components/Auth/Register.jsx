import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: ${({ theme }) => theme.bgLight};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.button};
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
`;

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
