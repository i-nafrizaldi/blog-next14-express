import prisma from '@/prisma';
import { Blog } from '@prisma/client';
import join from 'path';

export const updateBlogService = async (
  id: number,
  body: Partial<Blog>,
  file?: Express.Multer.File,
) => {
  try {
    const { title } = body;
    const blog = await prisma.blog.findFirst({
      where: { id },
    });

    if (!blog) {
      throw new Error('Blog not found');
    }
    if (title) {
      const blogTitle = await prisma.blog.findFirst({
        where: { title: { equals: title } },
      });
      if (blogTitle) {
        throw new Error('Title already in use');
      }
    }

    if (file) {
      body.thumbnail = `/images/${file.filename}`;
      //   const imagePath = join(__dirname, '../../../public' + blog.thumbnail);
    }

    return await prisma.blog.update({
      where: { id },
      data: { ...body },
    });
  } catch (error) {
    throw error;
  }
};
