const conn = require('./conn');
const { Sequelize } = conn;

const Student = conn.define('student', {
  name: Sequelize.STRING
});

module.exports = Student;