import { Sequelize } from 'sequelize';
import config from '../config/config';

export default (): Sequelize => {
  console.log('Data', config.databaseURL);
  const db = new Sequelize(config.databaseURL, { dialect: 'postgres' });
  return db;
};
