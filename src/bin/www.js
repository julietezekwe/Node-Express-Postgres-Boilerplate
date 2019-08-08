/* eslint-disable no-console */
import configureContainer from '../container';

const {
  config, logger, db, app,
} = configureContainer().cradle;
// Get the hostname and port to listen on
const hostname = config.hostname || '127.0.0.1';
const port = config.port || 8000;

// Log all database events
// db.on('connected', () => {

// });

// db.on('disconnected', () => {
//   logger.warn('Lost connection to database');
// });

// db.on('error', (err) => {
//   logger.error(`Database error: ${err.message}`);
// });

db.sequelize.authenticate()
  .then(() => {
    logger.info('Connected to database successfully');
    app.listen(port, () => {
      logger.info(`API is listening on ${hostname}:${port}`);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

process.on('SIGINT', () => {
  db.sequelize.close(); // properly close db connection
  logger.info('Shutting down server...');
  logger.info('Server successfully shutdown');
  process.exit(0);
});
