import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(createError(401, 'Not authorized to access this route'));
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, "your-secret-key");

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return next(createError(401, 'Not authorized to access this route'));
        }
    } catch (error) {
        next(error);
    }
};
