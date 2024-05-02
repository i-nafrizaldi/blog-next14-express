import { forgotPasswordService } from '@/services/auth/forgot-password.service';
import { KeepLoginService } from '@/services/auth/keep-login.service';
import { loginService } from '@/services/auth/login.services';
import { registerService } from '@/services/auth/register.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async keepLoginController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.body.user.id;

      const result = await KeepLoginService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async forgotPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await forgotPasswordService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}