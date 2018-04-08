const conn = require('./conn');
const { Sequelize } = conn;

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  GPA: {
    type: Sequelize.DECIMAL,
    allowNull: true,
    unique: false
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }  
}, {
  getterMethods: {
    name: function() {
      return this.firstName + ' ' + this.lastName;
    }
  }
});

module.exports = Student;