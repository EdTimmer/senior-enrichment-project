const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Red', GPA: 3.500, email: 'moe@gmail.com'}),
    Student.create({firstName: 'Larry', lastName: 'Blue', GPA: 4.000, email: 'larry@gmail.com'}),
    Student.create({firstName: 'Curly', lastName: 'Green', GPA: 3.750, email: 'curly@gmail.com'}),
    Campus.create({name: 'Coral And Sponge Academy', image: 'https://fednewsservice.com/NxdyTx/wp-content/uploads/2016/03/Academy.jpg', description: 'long descrition goes here for Starfleet Academy'}),
    Campus.create({name: 'Pelagic Journey Academy', image: 'http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/matrix_header.jpg?itok=Ex0PzEVh&resize=1100x619', description: 'Always Be Coding!'})
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