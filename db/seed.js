const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Red', GPA: 3.500, email: 'moe@gmail.com'}),
    Student.create({firstName: 'Larry', lastName: 'Blue', GPA: 4.000, email: 'larry@gmail.com'}),
    Student.create({firstName: 'Curly', lastName: 'Green', GPA: 3.750, email: 'curly@gmail.com'}),
    Campus.create({name: 'Starfleet Academy', image: 'http://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/145e57fc9bf64cbc8c161e73105c6a48', description: 'long descrition goes here for Starfleet Academy'}),
    Campus.create({name: 'Fullstack Academy', image: 'http://cdn.touropia.com/gfx/d/step-pyramids-of-the-world/uxmal.jpg?v=1', description: 'a long description for FA goes here'})
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