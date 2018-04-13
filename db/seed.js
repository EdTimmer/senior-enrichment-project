const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Salty', GPA: 3.500, email: 'moe@gmail.com', image: '/vendor/img/moe.jpg'}),
    Student.create({firstName: 'Larry', lastName: 'Wavygravy', GPA: 4.000, email: 'larry@gmail.com', image: '/vendor/img/larry.jpg' }),
    Student.create({firstName: 'Curly', lastName: 'Whatscookin', GPA: 3.750, email: 'curly@gmail.com', image: '/vendor/img/curly.jpg'}),
    Student.create({firstName: 'Angelina', lastName: 'Glow', GPA: 4.000, email: 'angelina@gmail.com', image: '/vendor/img/angelina.jpg'}),
    Campus.create({name: 'Fullstomach Academy', image: '/vendor/img/fullStomach.jpg', description: 'Do you like to eat?  Do you always look for the next meal?  Are you a true risk taker, willing to swallow anything?  Fullstomach Academy is where you belong!', motto: 'Always Be Eating!'}),
    Campus.create({name: 'Periscope Down Academy', image: '/vendor/img/periscopeDown.webp', description: 'Tired of cruise ships keeping you up all night?  Against submarines sneaking nuclear thingies right through your house?  Join our school and learn how to deal with these problems!', motto: 'Bottoms up!'}),
    Campus.create({name: 'Pelagic Journey Academy', image: '/vendor/img/pelagic.jpg', description: 'Do you like to swim?  Do you like feeling lost in a crowd?  Wiggle well with others?  Then join Pelagic Journey Academy!', motto: 'Keep going!'}),
    Campus.create({name: 'Deep Dive Academy', image: '/vendor/img/deepDive.jpg', description: 'Do you like the dark?  Cope well under pressure?  Can glow in the dark without swallowing batteries?  Then Deep Dive Academy is for you!', motto: 'How low can you go?'})
    
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