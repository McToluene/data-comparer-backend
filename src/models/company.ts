import { Sequelize, DataTypes } from 'sequelize';

const Company = (db: Sequelize) => {
  const company = db.define('company', {
    name: DataTypes.STRING,
    users: DataTypes.INTEGER,
    products: DataTypes.INTEGER,
    userFirebaseId: DataTypes.STRING,
    percentage: DataTypes.INTEGER,
  });
  return company;
};

export default Company;
