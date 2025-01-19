import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 2px dashed #ffff00;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  background-color: #333; /* Placeholder color for image */
`;

const GenerateImageCard = ({src,loading}) => {
  return (
    <Container>
      {loading ? (
        <div>
            <CircularProgress style={{color:"inherit", width: "24px", height: "24px", marginRight: "8px" }} />
            <span>Generate Your Image</span>
            </div>
      ) : (
        <>
          {src ? <Image src={src} alt="Generated Image" /> : <div>Write a prompt to generate image</div>}
        </>
      )}
    </Container>
  );
};

export default GenerateImageCard;
