import dotenv from 'dotenv';
dotenv.config();

export default {
  port: parseInt(process.env.PORT ?? '8080', 10),
  databaseURL: process.env.POSTGRES_URL ?? '',
  api: {
    prefix: '/api',
  },
};
