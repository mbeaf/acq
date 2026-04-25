import logger from '../config/logger.js';
import { signinSchema, signupSchema } from '../validations/auth.validation.js';
import { formatValidationErrors } from '../utils/format.js';
import { createUser, getUserByEmail, verifyPassword } from '../services/auth.services.js';
import { jwttoken } from '../utils/jwt.js';
import { cookies } from '../utils/cookies.js';

export const signup = async (req, res, next) => {
  const validationResult = signupSchema.safeParse(req.body);
  if (!validationResult.success) {
    const errors = formatValidationErrors(validationResult.error.issues);
    return res.status(400).json({ errors });
  }
  const { name, email, password, role } = validationResult.data;

  // Placeholder for user creation logic (e.g., database interaction)
  const user = await createUser({ name, email, password, role });
  console.log(user);
  const token = jwttoken.sign({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  cookies.setTokenCookie(res, token);

  logger.info(`Registering user: ${email} with role: ${role}`);
  res.status(201).json({
    message: 'User registered successfully',
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
};

export const signin = async (req, res, next) => {
  try {
    const validationResult = signinSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errors = formatValidationErrors(validationResult.error.issues);
      return res.status(400).json({ errors });
    }

    const { email, password } = validationResult.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    cookies.setTokenCookie(res, token);

    return res.status(200).json({
      message: 'Signed in successfully',
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    cookies.clearTokenCookie(res);
    return res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    return next(error);
  }
};
