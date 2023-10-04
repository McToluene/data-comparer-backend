import { Model, ModelCtor } from 'sequelize';
import Role from '../enum/role.enum';
import { IUser } from '../interfaces/model/IUser';

export default class UserService {
  constructor(private readonly userModel: ModelCtor<Model>) {}

  async createUser(data: any): Promise<IUser | undefined> {
    let user = null;
    try {
      user = await this.userModel.findOne({ where: { firebaseId: data.uid } });
      if (!user) {
        const newUser = {
          firebaseId: data.uid,
          email: data.email,
          role: Role.ADMIN,
        };
        user = await this.userModel.create(newUser);
      }
    } catch (error) {
      console.log('FAILED TO CREATE USER', error);
    }
    return user?.toJSON<IUser>();
  }

  async getUser(uid: any) {
    let user = null;
    try {
      user = await this.userModel.findOne({ where: { firebaseId: uid } });
    } catch (error) {
      console.log('FAILED TO GET USER', error);
    }
    return user?.toJSON<IUser>();
  }
}
