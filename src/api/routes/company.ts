import { Router, Response, Request } from 'express';
import CompanyService from '../../services/company.service';
import { ICompanyRequestDto } from '../../dto/request/company.request';

export default (app: Router, companyService: CompanyService) => {
  app.post('/company', async (req: Request, res: Response) => {
    const userId = req.user.uid;
    const data = req.body as ICompanyRequestDto;
    const errors = [];
    if (!data.name) errors.push('Name is required');
    if (data.users < 0) errors.push('Users is required');
    if (data.products < 0) errors.push('Products must be positive value');
    if (data.percentage < 0) errors.push('percentage must be positive value');
    if (errors.length > 0) return res.status(400).json({ errors });

    const company = await companyService.createCompany(data, userId);
    if (company)
      return res.status(201).json({ message: 'Company created successfully!', data: company });
    else return res.status(400).json({ message: 'Failed to create company!' });
  });

  app.get('/company', async (req: Request, res: Response) => {
    const company = await companyService.getUserCompany(req.user.uid);
    if (company)
      return res.status(200).json({ message: 'Company fetched successfully!', data: company });
    else return res.status(404).json({ message: 'Company not found!' });
  });

  app.get('/company/list', async (req: Request, res: Response) => {
    const companies = await companyService.getCompanies();
    if (companies)
      return res.status(200).json({ message: 'Company fetched successfully!', data: companies });
    else return res.status(404).json({ message: 'Company not found!' });
  });
};
