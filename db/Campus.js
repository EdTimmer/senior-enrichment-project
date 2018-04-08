const conn = require('./conn');
const { Sequelize } = conn;

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isURL: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    unique: false,
    allowNull: true
  }
});

module.exports = Campus;