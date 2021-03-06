const conn = require('./conn');
const Student = require('./Student');
const Campus = require('./Campus');

const seed = () => {
  Promise.all([
    Student.create({ firstName: 'Moe', lastName: 'Salty', GPA: 3.50, email: 'moe@gmail.com', image: 'https://www.mbari.org/wp-content/uploads/2016/01/barreleye1-350.jpg' }),
    Student.create({ firstName: 'Boxana', lastName: 'Caribbova', GPA: 4.00, email: 'boxana@gmail.com', image: 'http://r.ddmcdn.com/w_624/s_f/o_1/cx_0/cy_17/cw_624/ch_416/APL/uploads/2014/06/tanked-fish-pictures1.jpg' }),
    Student.create({ firstName: 'Larry', lastName: 'Wavygravy', GPA: 4.00, email: 'larry@gmail.com', image: 'http://www.smashinglists.com/wp-content/uploads/2010/02/1.mandarinfish-600x492.jpg' }),
    Student.create({ firstName: 'Curly', lastName: 'Whatscookin', GPA: 3.75, email: 'curly@gmail.com', image: 'http://snowbrains.com/wp-content/uploads/2015/01/great-white-shark-wallpaper-3204-hd-wallpapers.jpg' }),
    Student.create({ firstName: 'Cindy', lastName: 'Lauperfin', GPA: 3.50, email: 'cindy@gmail.com', image: 'https://s-media-cache-ak0.pinimg.com/originals/15/68/90/156890f8a8e2e863058553501f5fc452.jpg' }),
    Student.create({ firstName: 'Anglerina', lastName: 'Glow', GPA: 4.00, email: 'anglerina@gmail.com', image: 'https://www.montereybayaquarium.org/-/m/images/animal-guide/fishes/deep-sea-anglerfish.jpg' }),
    Student.create({ firstName: 'Shep', lastName: 'Wrassovich', GPA: 3.40, email: 'shep@gmail.com', image: 'https://media.immediate.co.uk/volatile/sites/3/2017/10/14351906-low_res-blue-planet-ii-7321320.jpg' }),
    Student.create({ firstName: 'Marina', lastName: 'Cavalryna', GPA: 3.90, email: 'marina@gmail.com', image: 'https://static1.squarespace.com/static/55930a68e4b08369d02136a7/559d8cd8e4b07f54795d27c2/559d8cdae4b07f54795d27c4/1442957923192/backlitSeahorse-Steeley.jpg' }),
    Campus.create({ name: 'Fullstomach Academy', image: 'http://www.abc.net.au/news/image/9209084-3x2-940x627.jpg', description: 'Do you like to eat?  Do you always look for the next meal?  Are you a true risk taker, willing to swallow anything?  Fullstomach Academy is where you belong!', motto: 'Always Be Eating!' }),
    Campus.create({ name: 'Periscope Down Academy', image: 'https://thumbs.imagekind.com/5405231_650/A-Pirates-Tale--Attack-Of-The-Mutant-Octopus_art.jpg', description: 'Tired of cruise ships keeping you up all night?  Against submarines sneaking nuclear thingies right through your house?  Join our school and learn how to deal with these problems!', motto: 'Bottoms up!' }),
    Campus.create({ name: 'Pelagic Journey Academy', image: 'https://i.pinimg.com/originals/eb/f3/e3/ebf3e35278b8d3923498b894a2bf483f.jpg', description: 'Do you like to swim?  Do you like feeling lost in a crowd?  Wiggle well with others?  Then join Pelagic Journey Academy!', motto: 'Keep going!' }),
    Campus.create({ name: 'Deep Dive Academy', image: 'http://farm6.staticflickr.com/5461/9544020233_20d443d801_o.jpg', description: 'Do you like the dark?  Cope well under pressure?  Can glow in the dark without swallowing batteries?  Then Deep Dive Academy is for you!', motto: 'How low can you go?' }),
    Campus.create({ name: 'Step Up Academy', image: 'https://universe-review.ca/I10-72-Eusthenopteron.jpg', description: `Feel like a fish out of water?  Longing for brave new dry world?  Then evolve and come ashore with Step Up Academy!`, motto: 'Water shmoter!' })
  ])
    .then(([moe, boxana, larry, curly, cindy, anglerina, shep, marina, fullstomach, periscope, pelagic, deep, step]) => {
      return Promise.all([
        moe.setCampus(periscope),
        boxana.setCampus(fullstomach),
        larry.setCampus(step),
        curly.setCampus(fullstomach),
        cindy.setCampus(periscope),
        anglerina.setCampus(deep),
        shep.setCampus(pelagic),
        marina.setCampus(periscope)
      ])
    })
}

module.exports = seed;