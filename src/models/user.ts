import { Sequelize, DataTypes } from 'sequelize';

const User = (db: Sequelize) => {
  const user = db.define('user', {
    firebaseId: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  });
  return user;
};

export default User;
