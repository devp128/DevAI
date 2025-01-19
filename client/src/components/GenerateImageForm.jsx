import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GenerateAIImage, CreatePost } from "../index.js";

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  margin-right: 30px;
  flex-direction: column;
  padding: 40px;
  background-color: #1b1e23;
  border-radius: 12px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.text_primary};
  gap: 25px;
  align-self: center;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 6px;
  background-color: #222;
  color: ${({ theme }) => theme.text_primary};
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 6px;
  background-color: #222;
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
  min-height: 120px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ disabled, theme }) => (disabled ? "#555" : "#007bff")};
  color: ${({ disabled }) => (disabled ? "#aaa" : "white")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const GenerateImageForm = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    author: "",
    prompt: "",
    photo: null,
  });

  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);

  const generateImagefun = async () => {
    if (!post.prompt.trim()) {
      console.error("Prompt is required");
      return;
    }
    setGenerateImageLoading(true);
    try {
      const res = await GenerateAIImage({ prompt: post.prompt });
      if (res?.photo) {
        setPost({ ...post, photo: res.photo });
      } else {
        console.error("No photo returned from server");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setGenerateImageLoading(false);
    }
  };

  const createpostfun = async () => {
    if (!post.author || !post.prompt || !post.photo) {
      console.error("Required fields are missing");
      return;
    }
    setCreatePostLoading(true);
    try {
      const res = await CreatePost(post);
      console.log("Post created:", res);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setCreatePostLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Generate Image with Prompt</Title>
      <Description>
        Write your prompt according to the image you want to generate!
      </Description>
      <Label>Author</Label>
      <Input
        type="text"
        placeholder="Enter your name..."
        value={post.author}
        onChange={(e) => setPost({ ...post, author: e.target.value })}
      />
      <Label>Image Prompt</Label>
      <TextArea
        placeholder="Write a detailed prompt about the image..."
        value={post.prompt}
        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
      />
      <ButtonContainer>
        <Button
          disabled={generateImageLoading || !post.prompt.trim()}
          onClick={generateImagefun}
        >
          {generateImageLoading ? "Generating..." : "Generate Image"}
        </Button>
        <Button
          disabled={createPostLoading || !post.author || !post.prompt || !post.photo}
          onClick={createpostfun}
        >
          {createPostLoading ? "Posting..." : "Post Image"}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default GenerateImageForm;
