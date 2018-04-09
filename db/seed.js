const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Red', GPA: 3.500, email: 'moe@gmail.com', image: 'https://www.mbari.org/wp-content/uploads/2016/01/barreleye1-350.jpg'}),
    Student.create({firstName: 'Larry', lastName: 'Blue', GPA: 4.000, email: 'larry@gmail.com', image: 'http://www.smashinglists.com/wp-content/uploads/2010/02/1.mandarinfish-600x492.jpg' }),
    Student.create({firstName: 'Curly', lastName: 'Green', GPA: 3.750, email: 'curly@gmail.com', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Pterois_volitans_Manado-e_edit.jpg'}),
    Campus.create({name: 'Periscope Down Academy', image: 'https://worldwideart-worldwideart.netdna-ssl.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/i/jim-warren-519o1102c-nautilus-in-danger-28x22-original.jpg', description: 'Tired of ships and sumbarines?  Join our school and learn how to deal with them!'}),
    Campus.create({name: 'Pelagic Journey Academy', image: 'http://www.emeraldislerealty.com/blog/wp-content/uploads/2014/11/Shipwreck-Coral-Fish-11-20-2014.jpg', description: 'Do you like to swim?  Do you like feeling lost in a crowd?  Do you appreciate synchronized swimming?  Then join our Pelagic Journey Academy!  We promise you, you will go (swim) far!'})
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