//const fetch = require('node-fetch')

const getRandomPic = async () => {
    try {
        let res = await fetch('https://api.unsplash.com//photos/random?client_id=xQYlE6yhvmV9-1V8KleRZajq-OZ_2lUbZuL6tmey3y8&query=camping&count=1')
        let data = await res.json()
        console.log(data[0].urls.regular)
    } catch(e) {
        console.log(e)

    }

}

getRandomPic()


