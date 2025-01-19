import express from 'express';
import { generateImage } from '../controllers/generateImage.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/generate', protect, generateImage);

export default router;