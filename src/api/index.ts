import { Router } from 'express';
import user from './routes/user';
import company from './routes/company';
import UserService from '../services/user.service';
import CompanyService from '../services/company.service';

export default (userSerivce: UserService, companyService: CompanyService) => {
  const app = Router();
  user(app, userSerivce);
  company(app, companyService);
  return app;
};
