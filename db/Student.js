const conn = require('./conn');
const { Sequelize } = conn;

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
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
    },
    image: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
      validate: {
        isURL: true
      }
    }, 
}, {
  getterMethods: {
    fullName: function() {
      return `${this.firstName} ${this.lastName}`;
    },
    // image: function() {
    //   return null;
    // }
  }
});

module.exports = Student;