import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${props => props.className?.includes('w-full') ? '100%' : 'auto'};

  &:hover {
    background: ${props => props.theme.primary}dd;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
  }
`;

export const Button = React.forwardRef((props, ref) => {
  return <StyledButton ref={ref} {...props} />;
});
