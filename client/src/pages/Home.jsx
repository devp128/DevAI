import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiDownload } from 'react-icons/fi';
import { AiOutlinePlus, AiOutlineLogout } from 'react-icons/ai';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch posts');
      }

      setPosts(data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `devai-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(post => 
    post.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo as={Link} to="/home">DevAI</Logo>
          <ButtonGroup>
            <CreateButton onClick={() => navigate('/create-post')}>
              <AiOutlinePlus /> Create Post
            </CreateButton>
            <LogoutButton onClick={handleLogout}>
              <AiOutlineLogout /> Logout
            </LogoutButton>
          </ButtonGroup>
        </HeaderContent>
      </Header>

      <Main>
        <HeroSection>
          <HeroTitle>Explore popular posts online</HeroTitle>
          <HeroSubtitle>Generated with AI</HeroSubtitle>
          <SearchBar
            type="text"
            placeholder="Search with prompt or name.."
            value={searchQuery}
            onChange={handleSearch}
          />
        </HeroSection>

        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}

        <Grid>
          {loading ? (
            <LoadingMessage>Loading posts...</LoadingMessage>
          ) : filteredPosts.length === 0 ? (
            <NoPostsMessage>
              {searchQuery ? 'No posts found matching your search.' : 'No posts found. Create your first post!'}
            </NoPostsMessage>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post._id}>
                <ImageWrapper>
                  <Image src={post.photo} alt={post.prompt} loading="lazy" />
                  <Overlay>
                    <CardInfo>
                      <CardTitle>{post.prompt}</CardTitle>
                      <CardAuthor>Created by DevAI</CardAuthor>
                    </CardInfo>
                    <DownloadButton onClick={() => handleDownload(post.photo)}>
                      <FiDownload />
                    </DownloadButton>
                  </Overlay>
                </ImageWrapper>
              </Card>
            ))
          )}
        </Grid>
      </Main>
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
  padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  text-decoration: none;
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

const CreateButton = styled(Button)`
  background: #8b5cf6;
  color: white;

  &:hover {
    background: #7c3aed;
    transform: translateY(-2px);
  }
`;

const LogoutButton = styled(Button)`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.text_secondary};
  margin-bottom: 2rem;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: ${props => props.theme.text_secondary};
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  background: ${props => props.theme.card};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    &:hover {
      transform: none; /* Disable hover animation on mobile */
    }
  }

  &:hover {
    transform: translateY(-5px);
    
    img {
      transform: scale(1.1);
    }
    
    div {
      opacity: 1;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 768px) {
    opacity: 1; /* Always show overlay on mobile */
    padding: 0.75rem;
  }
`;

const CardInfo = styled.div`
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 180px;
  }

  &:hover {
    white-space: normal;
    word-wrap: break-word;
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    padding: 0.5rem;
    border-radius: 0.25rem;
    z-index: 10;
    max-width: 90%;
    bottom: 100%;
    margin-bottom: 0.5rem;
  }
`;

const CardAuthor = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.text_secondary};
`;

const DownloadButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.black};
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    transform: scale(1.1);
    background: white;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.text_primary};
  font-size: 1.2rem;
  margin: 2rem 0;
`;

const NoPostsMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.text_secondary};
  font-size: 1.2rem;
  margin: 2rem 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 2rem auto;
  max-width: 600px;
`;

const theme = {
  black: '#000000',
  text_primary: '#ffffff',
  text_secondary: '#cccccc',
  primary: '#007bff',
  border: '#cccccc',
  bgLight: '#f0f0f0',
  card: '#ffffff'
};

export default Home;
