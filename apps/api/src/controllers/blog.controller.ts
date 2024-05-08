import { createBlogService } from '@/services/blog/create-blog.services';
import { getBlogService } from '@/services/blog/get-blog.service';
import { NextFunction, Request, Response } from 'express';

export class BlogController {
  // CREATE BLOG
  async createBlogController(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files.length) {
        throw new Error('no file uploaded');
      }

      const result = await createBlogService(req.body, files[0]);

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  // GET BLOG
  async getBlogController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const result = await getBlogService(Number(id));

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
}