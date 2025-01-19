import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdTravelExplore } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.button}; /* Uses button color from the theme */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.primary}; /* Hover background uses primary color from theme */
    transform: scale(1.05);
  }
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: ${({ theme }) => theme.bgLight}; /* Light background from the theme */
  color: ${({ theme }) => theme.text_primary};
  font-family: Arial, sans-serif;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

function Navbar() {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to get current location

  return (
    <NavbarContainer>
      <Logo>DevAI</Logo>
      {location.pathname === "/post" ? (
        <StyledButton onClick={() => navigate("/")}>
          <MdTravelExplore /> Explore Posts
        </StyledButton>
      ) : (
        <StyledButton onClick={() => navigate("/post")}>
          <FaPlus /> Create Post
        </StyledButton>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
