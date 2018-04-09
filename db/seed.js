const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Salty', GPA: 3.500, email: 'moe@gmail.com', image: 'https://www.mbari.org/wp-content/uploads/2016/01/barreleye1-350.jpg'}),
    Student.create({firstName: 'Larry', lastName: 'Wave', GPA: 4.000, email: 'larry@gmail.com', image: 'http://www.smashinglists.com/wp-content/uploads/2010/02/1.mandarinfish-600x492.jpg' }),
    Student.create({firstName: 'Curly', lastName: 'Longtail', GPA: 3.750, email: 'curly@gmail.com', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Pterois_volitans_Manado-e_edit.jpg'}),
    Campus.create({name: 'Periscope Down Academy', image: 'https://worldwideart-worldwideart.netdna-ssl.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/i/jim-warren-519o1102c-nautilus-in-danger-28x22-original.jpg', description: 'Tired of ships and sumbarines?  Join our school and learn how to deal with them!'}),
    Campus.create({name: 'Pelagic Journey Academy', image: 'http://twistedsifter.files.wordpress.com/2010/07/large-school-of-fish.jpg', description: 'Do you like to swim?  Do you like feeling lost in a crowd?  Do you appreciate synchronized swimming?  Then join our Pelagic Journey Academy!  We promise you will go (swim) far!'}),
    Campus.create({name: 'Deep Dive Academy', image: 'https://blog.mares.com/wp-content/uploads/2016/07/2016_07_18_Schwarze-Raucher_Schwarzer-Rauch-550x413.jpg', description: 'Do you like the dark?  Cope well under pressure?  Then Deep Dive Academy is for you!  Join and find out how low you can go!'})
  ])
  .then(([moe, larry, curly, periscope, pelagic, deep])=> {
    return Promise.all([
      moe.setCampus(periscope),
      larry.setCampus(pelagic),
      curly.setCampus(deep)
    ])
  })
}

module.exports = seed;