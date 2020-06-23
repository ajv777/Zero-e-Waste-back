const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.ecolec.es/reciclar-aparatos-electronicos/'
const arrPins= []

async function getPinCoords(pUrl){
    const response = await axios.get(`${pUrl}`)
    const $ = cheerio.load(response.data)

    const coordsAtr = $('#pickUpPointsMap')

    
    const coords = JSON.parse(coordsAtr[0].attribs['data-pick-up-points'])

    console.log(coords[5].locality)


}

// Subir esto a la base de datos
// Pintar en mapa

getPinCoords(url)

