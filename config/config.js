const databaseConfig = require('./databaseConfig');
const emailConfig = require('./emailConfig');
const tokensConfig = require('./tokenConfig');

module.exports = {
  database: databaseConfig,
  email: emailConfig,
  tokens: tokensConfig,
};
