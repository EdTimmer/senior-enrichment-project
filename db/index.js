const Student = require('./Student');
const Campus = require('./Campus');
const seed = require('./seed');
const conn = require('./conn');

Student.belongsTo(Campus);
// Campus.hasMany(Student);
Campus.hasMany(Student, {as: 'students'} );

const sync = ()=> conn.sync({force: true});

module.exports = {
  sync,
  seed,
  models: {
    Campus,
    Student
  }
};
