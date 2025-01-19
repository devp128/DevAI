import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login', { 
          state: { message: 'Registration successful! Please login.' }
        });
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LogoLink to="/">
        <Logo>DevAI</Logo>
      </LogoLink>
      <FormCard>
        <FormHeader>
          <Title>Create Account</Title>
          <Subtitle>Sign up for a new account</Subtitle>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              minLength={3}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
            <HelperText>Password must be at least 6 characters long</HelperText>
          </FormGroup>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </Form>

        <LoginText>
          <span>Already have an account? </span>
          <LoginLink to="/login">Login</LoginLink>
        </LoginText>
      </FormCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  background-color: ${props => props.theme.black};
  background-image: radial-gradient(
    circle at center,
    ${props => props.theme.bgLight} 0%,
    ${props => props.theme.black} 100%
  );
`;

const LogoLink = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  text-decoration: none;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;

  background: white;

  // background: linear-gradient(to right, 
  //   ${props => props.theme.primary}, 
  //   ${props => props.theme.secondary}
  // );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  &:hover {
    font-size: 2rem;
  }
  transition: all 0.3s ease;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 28rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, 
    ${props => props.theme.primary}, 
    ${props => props.theme.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.text_secondary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.text_primary};
`;

const LoginText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.text_secondary};
`;

const LoginLink = styled(Link)`
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const HelperText = styled.p`
  color: ${props => props.theme.text_secondary};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export default Register;
