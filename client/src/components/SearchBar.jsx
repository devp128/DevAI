import React from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@mui/icons-material';

const SearchBarContainer = styled.div`
  max-width: 550px;
  display: flex;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.text_secondary || '#ccc'};
  color: ${({ theme }) => theme.text_primary+90};
  border-radius: 8px;
  padding: 12px 16px;
  gap: 6px;
  align-items: center;
`;


function SearchBar() {
  return (
    <SearchBarContainer>
      <SearchOutlined />
    <input
        placeholder='Search with promt or name .. '
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          color: "inherit",
          fontSize: "16px",
          background: "transparent",
    }}/>
    </SearchBarContainer>
  );
}

export default SearchBar;
