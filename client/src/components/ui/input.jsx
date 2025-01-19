import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: ${props => props.theme.text_primary};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
  }

  &::placeholder {
    color: ${props => props.theme.text_secondary};
  }
`;

export const Input = React.forwardRef((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});
