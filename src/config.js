/* eslint-disable no-var */
var dotenv = require('dotenv');

dotenv.config();

// required environment variables
[
  'NODE_ENV', 'PORT', 'API_PREFIX', 'DB_USER',
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

module.exports = {
  env: process.env.NODE_ENV,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  db: {
    test: {
      username: process.env.DB_USER_TEST,
      password: process.env.DB_PASS_TEST,
      database: process.env.DB_NAME_TEST,
      host: process.env.DB_HOST_TEST,
    },
    dev: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
    },
  },
  logs: {
    label: process.env.LOG_LABEL,
    level: process.env.LOG_LEVEL,
    filename: process.env.LOG_FILE,
  },
  api: {
    prefix: process.env.API_PREFIX,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
