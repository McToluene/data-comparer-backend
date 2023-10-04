import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from '../config/config';
import routes from '../api/';
import UserService from '../services/user.service';
import authMiddleware from '../middlewares/auth-middleware';
import CompanyService from '../services/company.service';

export default (app: Application, userSerivce: UserService, companyService: CompanyService) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, authMiddleware);
  app.use(config.api.prefix, routes(userSerivce, companyService));
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
