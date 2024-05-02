import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verifyToken';

export class AuthRouter {
  private authController: AuthController;
  private router: Router;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.intializeRouters();
  }

  private intializeRouters() {
    this.router.get(
      '/keep-login',
      verifyToken,
      this.authController.keepLoginController,
    );
    this.router.post('/register', this.authController.registerController);
    this.router.post('/login', this.authController.loginController);
    this.router.post(
      '/forgot-password',
      this.authController.forgotPasswordController,
    );
  }

  getRouter() {
    return this.router;
  }
}
