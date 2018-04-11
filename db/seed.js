const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Salty', GPA: 3.500, email: 'moe@gmail.com', image: 'https://www.mbari.org/wp-content/uploads/2016/01/barreleye1-350.jpg'}),
    Student.create({firstName: 'Larry', lastName: 'Wave', GPA: 4.000, email: 'larry@gmail.com', image: 'http://www.smashinglists.com/wp-content/uploads/2010/02/1.mandarinfish-600x492.jpg' }),
    Student.create({firstName: 'Curly', lastName: 'Longfin', GPA: 3.750, email: 'curly@gmail.com', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Pterois_volitans_Manado-e_edit.jpg'}),
    Student.create({firstName: 'Angelina', lastName: 'Glow', GPA: 4.000, email: 'angelina@gmail.com', image: 'https://www.montereybayaquarium.org/-/m/images/animal-guide/fishes/deep-sea-anglerfish.jpg'}),
    Campus.create({name: 'Fullstomach Academy', image: 'https://i.pinimg.com/originals/8d/cd/58/8dcd583f893559c4e71368648fcb0df1.jpg', description: 'Do you like to eat?  Do you always look for the next meal?  Are you a true risk taker, willing to swallow anything?  Fullstomach Academy is where you belong!  Always Be Eating!', link: 'test'}),
    Campus.create({name: 'Periscope Down Academy', image: 'https://nerdist.com/wp-content/uploads/2015/09/338400-science-fiction-20000-leagues-under-the-sea-wallpaper.jpg', description: 'Tired of cruise ships keeps you up all night?  Against submarines sneaking nuclear thingies right through your home?  Join our school and learn how to deal with these problems!'}),
    Campus.create({name: 'Pelagic Journey Academy', image: 'http://twistedsifter.files.wordpress.com/2010/07/large-school-of-fish.jpg', description: 'Do you like to swim?  Do you like feeling lost in a crowd?  Do you appreciate synchronized swimming?  Then join our Pelagic Journey Academy!  We promise you will go (swim) far!'}),
    Campus.create({name: 'Deep Dive Academy', image: 'https://blog.mares.com/wp-content/uploads/2016/07/2016_07_18_Schwarze-Raucher_Schwarzer-Rauch-550x413.jpg', description: 'Do you like the dark?  Cope well under pressure?  Can glow in the dark without swallowing batteries?  Then Deep Dive Academy is for you!  How low can you go?'})
    
  ])
  .then(([moe, larry, curly, angelina, fullstomach, periscope, pelagic, deep])=> {
    return Promise.all([
      moe.setCampus(periscope),
      larry.setCampus(pelagic),
      curly.setCampus(fullstomach),
      angelina.setCampus(deep)
    ])
  })
}

module.exports = seed;