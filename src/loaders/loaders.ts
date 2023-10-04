import { Application } from 'express';

import User from '../models/user';
import data from './data';
import express from './express';

import UserService from '../services/user.service';
import Company from '../models/company';
import CompanyService from '../services/company.service';

export default async (app: Application) => {
  const db = data();
  console.log('Db connected!');

  const user = User(db);
  const company = Company(db);
  db.sync();

  const userSerivce = new UserService(user);
  const companyService = new CompanyService(company, user);
  express(app, userSerivce, companyService);
  console.log('Express loaded!');
};
