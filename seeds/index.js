const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const getRandomPic = async () => {
    try {
        let res = await fetch('https://api.unsplash.com//photos/random?client_id=xQYlE6yhvmV9-1V8KleRZajq-OZ_2lUbZuL6tmey3y8&query=camping&count=1')
        let data = await res.json()
        return data[0].urls.regular
    } catch(e) {
        console.log(e)

    }
}


//ObjectId('66ea1ed5e57419409c4752fd')


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        let randomCamgroundPicture = await getRandomPic()
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66ea1ed5e57419409c4752fd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: randomCamgroundPicture,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
        console.log("successful insert")
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})