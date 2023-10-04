import { Model, ModelCtor, where } from 'sequelize';
import { ICompany } from '../interfaces/model/ICompany';
import Role from '../enum/role.enum';
import { IUser } from '../interfaces/model/IUser';

export default class CompanyService {
  constructor(
    private readonly companyModel: ModelCtor<Model>,
    private readonly userModel: ModelCtor<Model>
  ) {}

  async createCompany(data: any, userId: string): Promise<ICompany | undefined> {
    let company = null;
    try {
      company = await this.companyModel.findOne({ where: { userFirebaseId: userId } });
      if (!company) {
        const newCompany = {
          name: data.name,
          users: data.users,
          products: data.products,
          percentage: data.percentage,
          userFirebaseId: userId,
        };
        company = await this.companyModel.create(newCompany);
      }
    } catch (error) {
      console.log('FAILED TO CREATE COMPANY', error);
    }
    return company?.toJSON<ICompany>();
  }

  async getCompanies() {
    let companies = null;
    try {
      const usersQuery = await this.userModel.findAll({ where: { role: Role.USER }, limit: 2 });
      const userIds = usersQuery?.map((user) => user.toJSON<IUser>()).map((u) => u.firebaseId);
      companies = await this.companyModel.findAll({ where: { userFirebaseId: userIds }, limit: 2 });
    } catch (error) {
      console.log('FAILED TO GET COMPANY', error);
    }
    return companies?.map((company) => company.toJSON<ICompany>());
  }

  async getUserCompany(userId: string) {
    let company = null;
    try {
      company = await this.companyModel.findOne({ where: { userFirebaseId: userId } });
    } catch (error) {
      console.log('FAILED TO GET COMPANY', error);
    }
    return company?.toJSON<ICompany>();
  }
}
