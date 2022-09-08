/* eslint-disable no-console */
const db = require('../db/models');

module.exports = async function testDatabaseConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('Successfully connected to DB');
  } catch (error) {
    console.log('Can`t connect to DB');
    console.log(error.message);
  }
};
