const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({name: 'flounder'}),
    Student.create({name: 'tuna'}),
    Student.create({name: 'goldfish'}),
    Campus.create({name: 'Starfleet Academy'}),
    Campus.create({name: 'Fullstack Academy'})
  ])
  .then(([flounder, tuna, goldfish, Starfleet, Fullstack])=> {
    return Promise.all([
      flounder.setCampus(Starfleet),
      tuna.setCampus(Starfleet),
      goldfish.setCampus(Fullstack)
    ])
  })
}

module.exports = seed;