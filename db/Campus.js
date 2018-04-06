const conn = require('./conn');
const { Sequelize } = conn;

const Campus = conn.define('campus', {
  name: Sequelize.STRING
});

module.exports = Campus;