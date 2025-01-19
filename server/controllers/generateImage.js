import * as dotenv from 'dotenv';
import axios from "axios";
import { createError } from "../error.js";

dotenv.config();

const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Valid prompt is required"));
    }

    console.log('Generating image for prompt:', prompt);

    // Query the Hugging Face model
    const response = await axios({
      method: 'post',
      url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        inputs: prompt,
        options: {
          wait_for_model: true
        }
      },
      responseType: 'arraybuffer'
    });

    if (!response.data) {
      console.error('No data received from Hugging Face');
      return next(createError(500, "Failed to generate image. No output received."));
    }

    // Convert binary data to base64
    const base64Image = `data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`;

    console.log('Successfully generated image');

    return res.status(200).json({
      success: true,
      photo: base64Image,
      prompt,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error generating image:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      
      // If we got a text response instead of an image, log it
      if (error.response.headers['content-type']?.includes('text')) {
        const textError = error.response.data.toString();
        console.error("Response error text:", textError);
        return next(createError(500, `API Error: ${textError}`));
      }
    }
    
    return next(
      createError(500, "Failed to generate image: " + (error.message || "Unknown error"))
    );
  }
};

export { generateImage };
