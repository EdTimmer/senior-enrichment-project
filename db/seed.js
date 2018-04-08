const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Red', GPA: 3.500, email: 'moe@gmail.com'}),
    Student.create({firstName: 'Larry', lastName: 'Blue', GPA: 4.000, email: 'larry@gmail.com'}),
    Student.create({firstName: 'Curly', lastName: 'Green', GPA: 3.750, email: 'curly@gmail.com'}),
    Campus.create({name: 'Starfleet Academy'}),
    Campus.create({name: 'Fullstack Academy'})
  ])
  .then(([moe, larry, curly, Starfleet, Fullstack])=> {
    return Promise.all([
      moe.setCampus(Starfleet),
      larry.setCampus(Starfleet),
      curly.setCampus(Fullstack)
    ])
  })
}

module.exports = seed;