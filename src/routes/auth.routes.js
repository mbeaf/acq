import express from 'express';
import { signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/sign-up', signup);

router.post('/sign-in', signin);

router.post('/sign-out', signout);

export default router;
