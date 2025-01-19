import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { DownloadRounded } from '@mui/icons-material';
import FileSaver from 'file-saver';

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const DownloadButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 300px;
  height: 200px;

  &:hover ${HoverOverlay}, &:hover ${DownloadButton} {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Author = styled.div`
  color: white;
  font-size: 1rem;
`;


  const ImageCard = ({ item }) => {
    const downloadImage = () => {
      const link = document.createElement('a');
      link.href = item.imageUrl; // Ensure item.imageUrl contains the correct image URL
      link.download = 'image.jpg'; // You can set the desired file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <Card>
        <img
          src={item.imageUrl}
          alt={item.prompt}
          effect="blur"
          width="100%"
          height="100%"
          style={{ display: 'block', objectFit: 'cover' }}
        />
        <HoverOverlay>
          <Prompt>{item.prompt}</Prompt>
          <Author>{item.author}</Author>
        </HoverOverlay>
        <DownloadButton onClick={downloadImage}>
          <DownloadRounded />
        </DownloadButton>
      </Card>
    );

  };
  
export default ImageCard;