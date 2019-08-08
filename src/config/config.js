/* eslint-disable no-var */
var config = require('../config');

module.exports = {
  development: {
    username: config.db.dev.username,
    password: config.db.dev.password,
    database: config.db.dev.database,
    host: config.db.dev.host,
    dialect: 'postgres',
  },
  test: {
    username: config.db.test.username,
    password: config.db.test.password,
    database: config.db.test.database,
    host: config.db.test.host,
    dialect: 'postgres',
  },
  production: {
  },
};
