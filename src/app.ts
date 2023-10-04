import config from './config/config';
import express, { Application } from 'express';

async function startServer() {
  const app: Application = express();

  await (await import('./loaders/loaders')).default(app);
  app
    .listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit(1);
    });
}
startServer();
