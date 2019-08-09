import express from 'express';
import { listModules } from 'awilix';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import cronjob from './jobs/cron';

const createApp = ({ logger, container, config }) => {
  const app = express();
  app.get('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  // Enable Cross Origin Resource Sharing to all origins
  app.use(cors());

  // Log requests to the console.
  app.use(morgan('dev'));

  // Parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const registrations = listModules('routes/*.js', { cwd: __dirname })
    .map(registration => ({
      name: registration.name,
      router: container.resolve(registration.name),
    }));

  // Mount all routers within API router
  registrations.forEach((eachRegistration) => {
    const { name, router } = eachRegistration;
    app.use(`${config.api.prefix}/${name}`, router);
    logger.info(`Mounted ${name} to ${config.api.prefix}/${name}}`);
  });

  // error handlers
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Well, will you help build this route? 🤷🏼‍♂️',
    });
    next();
  });
  const clearLog = () => {
    fs.writeFile('./setup.log', '', (err) => {
      if (err) throw err;
      return logger.info('Suucessfully cleared log file');
    });
  };

  cronjob('0 0 */24 * * *', clearLog);

  return app;
};

export default createApp;
