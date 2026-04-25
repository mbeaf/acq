import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '1d';

export const jwttoken = {
  sign: (payload) => {
    try {
      if (!payload || typeof payload !== 'object') {
        throw new Error('Payload must be a non-empty object');
      } else {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      }
    } catch (error) {
      logger.error('Error signing JWT:', error.message);
      throw error;
    }
  },
  verify: (token) => {
    try {
      if (!token || typeof token !== 'string') {
        throw new Error('Token must be a non-empty string');
      } else {
        return jwt.verify(token, JWT_SECRET);
      }
    } catch (error) {
      logger.error('Error verifying JWT:', error.message);
      throw error;
    }
  },
};
