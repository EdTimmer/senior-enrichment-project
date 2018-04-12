const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = ()=> {
  Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Salty', GPA: 3.500, email: 'moe@gmail.com', image: 'https://www.mbari.org/wp-content/uploads/2016/01/barreleye1-350.jpg'}),
    Student.create({firstName: 'Larry', lastName: 'Wavygravy', GPA: 4.000, email: 'larry@gmail.com', image: 'http://www.smashinglists.com/wp-content/uploads/2010/02/1.mandarinfish-600x492.jpg' }),
    Student.create({firstName: 'Curly', lastName: 'Whatscookin', GPA: 3.750, email: 'curly@gmail.com', image: 'http://snowbrains.com/wp-content/uploads/2015/01/great-white-shark-wallpaper-3204-hd-wallpapers.jpg'}),
    Student.create({firstName: 'Angelina', lastName: 'Glow', GPA: 4.000, email: 'angelina@gmail.com', image: 'https://www.montereybayaquarium.org/-/m/images/animal-guide/fishes/deep-sea-anglerfish.jpg'}),
    Campus.create({name: 'Fullstomach Academy', image: 'http://www.abc.net.au/news/image/9209084-3x2-940x627.jpg', description: 'Do you like to eat?  Do you always look for the next meal?  Are you a true risk taker, willing to swallow anything?  Fullstomach Academy is where you belong!', motto: 'Always Be Eating!'}),
    Campus.create({name: 'Periscope Down Academy', image: 'https://www.bitsonline.com/wp-content/uploads/2018/02/Kraken1.jpg', description: 'Tired of cruise ships keeping you up all night?  Against submarines sneaking nuclear thingies right through your house?  Join our school and learn how to deal with these problems!', motto: 'Bottoms up!'}),
    Campus.create({name: 'Pelagic Journey Academy', image: 'https://dtmag.com/wp-content/uploads/2004/05/scuba-school-of-fish-1050x700.jpg', description: 'Do you like to swim?  Do you like feeling lost in a crowd?  Wiggle well with others?  Then join Pelagic Journey Academy!', motto: 'Go (swim) far!'}),
    Campus.create({name: 'Deep Dive Academy', image: 'http://s.ngm.com/2012/09/seamounts/img/deepsea-submersible-615.jpg', description: 'Do you like the dark?  Cope well under pressure?  Can glow in the dark without swallowing batteries?  Then Deep Dive Academy is for you!', motto: 'How low can you go?'})
    
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