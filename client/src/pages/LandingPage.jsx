import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';




const LandingPage = () => {
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate('/login');
    }
  };

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroGradient />
        
        {/* Navigation */}
        <Nav>
          <Logo>DevAI</Logo>
          <NavButtons>
            <StyledLink to="/login">
              <OutlineButton>Sign In</OutlineButton>
            </StyledLink>
            <StyledLink to="/register">
              <PrimaryButton>Sign Up</PrimaryButton>
            </StyledLink>
          </NavButtons>
        </Nav>

        {/* Main Content */}
        <MainContent>
          <ContentWrapper>
            <Title>Generate Your Image with DevAI</Title>
            <Subtitle>
              Create stunning AI-generated images in seconds with our powerful tools
            </Subtitle>
            
            {/* Search Bar */}
            <SearchWrapper>
              <SearchBar>
                <SearchInput 
                  type="text"
                  placeholder="Search with prompt or name.."
                  onKeyPress={handleKeyPress}
                />
              </SearchBar>
            </SearchWrapper>
          </ContentWrapper>
        </MainContent>
      </HeroSection>

      {/* Featured Images Grid */}
      <FeaturedSection>
        <SectionTitle>Featured Generations</SectionTitle>
        <ImageGrid>
          <ImageCard to="/login">
            <ImageWrapper>
              <Image src={'https://res.cloudinary.com/dgw8mpgzg/image/upload/v1737299120/fefaovvemofgrl5favcz.jpg'} alt="AI Generated" loading="lazy" />
            </ImageWrapper>
          </ImageCard>
          <ImageCard to="/login">
            <ImageWrapper>
              <Image src={'https://res.cloudinary.com/dgw8mpgzg/image/upload/v1737299120/fvjalbaml9njitohp15p.jpg'} alt="AI Generated" loading="lazy" />
            </ImageWrapper>
          </ImageCard>
          <ImageCard to="/login">
            <ImageWrapper>
              <Image src={'https://res.cloudinary.com/dgw8mpgzg/image/upload/v1737299123/rv4tbz9hj3weop4m7esg.jpg'} alt="AI Generated" loading="lazy" />
            </ImageWrapper>
          </ImageCard>
          <ImageCard to="/login">
            <ImageWrapper>
              <Image src={'https://res.cloudinary.com/dgw8mpgzg/image/upload/v1737220247/spt298kf2fkrk3rrhw7e.jpg'} alt="AI Generated" loading="lazy" />
            </ImageWrapper>
          </ImageCard>
          <ImageCard to="/login">
            <ImageWrapper>
              <Image src={'https://res.cloudinary.com/dgw8mpgzg/image/upload/v1737220285/bhztoobq2h3zx6bdk14q.jpg'} alt="AI Generated" loading="lazy" />
            </ImageWrapper>
          </ImageCard>
          <ImageCard to="/login">
            <ImageWrapper>
              <Image src={'https://res.cloudinary.com/dgw8mpgzg/image/upload/v1737220255/cicdesjnv6hhpxz4gvjh.jpg'} alt="AI Generated" loading="lazy" />
            </ImageWrapper>
          </ImageCard>
        </ImageGrid>
      </FeaturedSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.text_primary};
`;

const HeroSection = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const HeroGradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top center, rgba(91, 33, 182, 0.2) 0%, transparent 70%);
`;

const Nav = styled.nav`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.text_primary};
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }
`;

const OutlineButton = styled(Button)`
  background: transparent;
  border: 1px solid ${props => props.theme.text_primary};
  color: ${props => props.theme.text_primary};
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.primary};
  border: none;
  color: white;
  &:hover {
    background: ${props => props.theme.primary}dd;
  }
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem 1rem; /* Reduced bottom padding */
`;

const ContentWrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #fff, #ccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.text_secondary};
  margin-bottom: 3rem;
`;

const SearchWrapper = styled.div`
  max-width: 32rem;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin-bottom: 0.1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
  background: transparent;

  border: none;
  padding: 0 1rem;
  color: ${props => props.theme.text_primary};
  font-size: 1.125rem;
  &::placeholder {
    color: ${props => props.theme.text_secondary};
  }
  &:focus {
    outline: none;
  }
`;

const FeaturedSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem; /* Reduced top padding */
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.75rem;
  }
`;

const ImageCard = styled(Link)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    
    img {
      transform: scale(1.1);
    }
    
    div {
      opacity: 1;
    }
  }
}

  
  @media (max-width: 480px) {
    aspect-ratio: 16/9;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.bgLight};
  border-radius: 1rem;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  transition: transform 0.3s ease;
  background: ${props => props.theme.bgLight};
  &:hover {
    transform: scale(1.05);
  }
`;

export default LandingPage;
