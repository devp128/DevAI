import Post from "../models/post.models.js";
import * as dotenv from "dotenv";
import{ v2 as cloudinary } from "cloudinary";
import { createError } from "../error.js";

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Error getting posts:', error);
    next(createError(500, 'Failed to fetch posts'));
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { prompt, photo, userName } = req.body;

    if (!prompt || !photo) {
      return next(createError(400, "Prompt and photo are required"));
    }

    // Log Cloudinary config (without secrets)
    console.log('Cloudinary Config:', {
      cloud_name: process.env.CLOUD_NAME,
      hasApiKey: !!process.env.API_KEY,
      hasApiSecret: !!process.env.API_SECRET
    });

    // Upload to Cloudinary
    let photoUrl;
    try {
      photoUrl = await cloudinary.uploader.upload(photo, {
        folder: 'devai_posts'
      });
      
      console.log('Upload successful:', photoUrl.secure_url);
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return next(createError(500, 'Failed to upload image. Please check your Cloudinary configuration.'));
    }

    // Create post
    const newPost = await Post.create({
      userName,
      prompt,
      photo: photoUrl.secure_url,
    });

    res.status(201).json({ 
      success: true, 
      data: newPost 
    });
  } catch (error) {
    console.error("Error in createPost:", error);
    next(createError(500, 'Failed to create post'));
  }
};
