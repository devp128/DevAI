import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Your backend API base URL
});

export const GetPosts = async () => {
  try {
    const response = await API.get("/post/");
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const CreatePost = async (data) => {
  try {
    const response = await API.post("/post/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const GenerateAIImage = async (data) => {
  try {
    const response = await API.post("/generateImage/", data);
    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};