import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOutlineHome, AiOutlineLogout, AiOutlineRocket, AiOutlineCloudUpload, AiOutlineDownload } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const CreatePost = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [post, setPost] = useState({
    prompt: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleGenerate = async () => {
    if (!post.prompt) {
      setError('Please enter a prompt');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/generateImage/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ prompt: post.prompt }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to generate image');
      }

      setPost({
        ...post,
        photo: data.photo
      });
    } catch (error) {
      console.error('Error generating image:', error);
      setError(error.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!post.photo) {
      setError('Please generate an image first');
      return;
    }
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = post.photo;
    link.download = `devai-creation-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo as={Link} to="/home">DevAI</Logo>
          <ButtonGroup>
            <ExploreButton onClick={() => navigate('/home')}>
              <AiOutlineHome /> Explore
            </ExploreButton>
            <LogoutButton onClick={handleLogout}>
              <AiOutlineLogout /> Logout
            </LogoutButton>
          </ButtonGroup>
        </HeaderContent>
      </Header>

      <Wrapper>
        {/* Form Section */}
        <FormSection>
          <FormTitle>Create with DevAI</FormTitle>
          <FormDescription>
            Transform your imagination into stunning images with our AI-powered image generator
          </FormDescription>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Form>
            <FormGroup>
              <Label>Your Prompt</Label>
              <PromptInput
                value={post.prompt}
                onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                placeholder="A surreal digital artwork of a floating city in the clouds..."
                disabled={loading}
              />
            </FormGroup>

            <ButtonContainer>
              <ActionButton 
                onClick={handleGenerate}
                disabled={loading || !post.prompt}
              >
                <AiOutlineRocket /> {loading ? 'Generating...' : 'Generate'}
              </ActionButton>
              <ActionButton 
                onClick={handleDownload}
                disabled={loading || !post.photo}
              >
                <FiDownload /> Download
              </ActionButton>
            </ButtonContainer>
          </Form>
        </FormSection>

        {/* Preview Section */}
        <PreviewSection>
          <PreviewCard>
            {loading ? (
              <LoadingText>Generating your masterpiece...</LoadingText>
            ) : post.photo ? (
              <PreviewImage src={post.photo} alt="Generated" />
            ) : (
              <PlaceholderText>
                Your creation will appear here
              </PlaceholderText>
            )}
          </PreviewCard>
        </PreviewSection>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.black};
`;

const Header = styled.header`
  background-color: ${props => props.theme.bgLight};
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 1.2rem;
  }
`;

const ExploreButton = styled(Button)`
  background: #8b5cf6;
  color: white;
  padding: 0.5rem 1rem;

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    svg {
      font-size: 1rem;
    }
  }

  &:hover {
    background: #7c3aed;
    transform: translateY(-2px);
  }
`;

const LogoutButton = styled(Button)`
  background: transparent;
  color: ${props => props.theme.text_primary};
  border: 1px solid ${props => props.theme.border};
  padding: 0.5rem 1rem;

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    svg {
      font-size: 1rem;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const FormDescription = styled.p`
  color: ${props => props.theme.text_secondary};
  margin-bottom: 2rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-weight: 500;
`;

const PromptInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  resize: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.text_secondary};
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${props => props.theme.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.25rem;
  }
`;

const PreviewSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
`;

const PreviewCard = styled.div`
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoadingText = styled.div`
  color: ${props => props.theme.text_secondary};
  font-size: 1.125rem;
  text-align: center;
  padding: 2rem;
`;

const PlaceholderText = styled(LoadingText)`
  color: ${props => props.theme.text_secondary};
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

export default CreatePost;