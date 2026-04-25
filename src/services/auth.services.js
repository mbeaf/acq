import bcrypt from 'bcrypt';
import logger from '../config/logger.js';
import { eq } from 'drizzle-orm';
import { db } from '../config/database.js';
import { users } from '../models/users.js';

export const hashPassword = async (password) => {
  // Placeholder for hashing logic (e.g., bcrypt)
  try {
    // Simulate hashing
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.info('Error hashing password:', error.message);
    throw new Error('Error occurred while hashing password');
  }
};

export const getUserByEmail = async (email) => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    logger.info(error);
    throw error;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    logger.info('Error verifying password:', error.message);
    throw new Error('Error occurred while verifying password');
  }
};

export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (existingUser.length > 0) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await hashPassword(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
    };
    const result = await db
      .insert(users)
      .values({
        ...newUser,
      })
      .returning();

    return result[0];
  } catch (error) {
    logger.info(error);
    throw error;
  }
};
