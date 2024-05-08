import { BlogController } from '@/controllers/blog.controller';
import { uploader } from '@/lib/uploader';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class BlogRouter {
  private blogController: BlogController;
  private router: Router;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.intializeRouters();
  }

  private intializeRouters(): void {
    this.router.post(
      '/',
      verifyToken,
      uploader('IMG', '/images').array('thumbnail', 1),
      this.blogController.createBlogController,
    );
    this.router.get('/:id', this.blogController.getBlogController);
  }

  getRouter(): Router {
    return this.router;
  }
}