import { User } from '@prisma/client';
import { hashPasswrord } from '../../lib/bcrypt';
import prisma from '@/prisma';

export const registerService = async (
  body: Pick<User, 'email' | 'fullName' | 'password'>,
) => {
  try {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      throw new Error('Email already exist');
    }

    const hashedPassword = await hashPasswrord(password);

    const newUser = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });
    return {
      message: 'Register success',
      data: newUser,
    };
  } catch (error) {
    throw error;
  }
};
