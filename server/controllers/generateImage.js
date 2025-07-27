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

    // Query the Hugging Face model using the new API
    const response = await axios({
      method: 'post',
      url: "https://router.huggingface.co/nebius/v1/images/generations",
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        response_format: "b64_json",
        prompt: prompt,
        model: "stability-ai/sdxl"
      },
      responseType: 'json'
    });

    if (!response.data || !response.data.data || !response.data.data[0] || !response.data.data[0].b64_json) {
      console.error('No valid image data received from Hugging Face');
      return next(createError(500, "Failed to generate image. No output received."));
    }

    // Extract base64 image from JSON response
    const base64Image = `data:image/png;base64,${response.data.data[0].b64_json}`;

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
      
      // If we got a text response, log it
      if (error.response.headers['content-type']?.includes('text') || error.response.headers['content-type']?.includes('json')) {
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
