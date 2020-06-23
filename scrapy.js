require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')

const { connect } = require('./db')
const { create, removeAll, getAll } = require('./models/epoints')

const url = 'https://www.ecolec.es/reciclar-aparatos-electronicos/'
const arrPins= []

connect()

async function getPinCoords(pUrl){
    const response = await axios.get(`${pUrl}`)
    const $ = cheerio.load(response.data)

    const coordsAtr = $('#pickUpPointsMap')

    
    const coords = JSON.parse(coordsAtr[0].attribs['data-pick-up-points'])

    //Esto limpia la tabla de los datos anteriores
    await removeAll()

    //Esto guarda nuevos datos
    for(const coord of coords ){
        await create(coord)
    }
    getAll()
    process.exit()
}

// Subir esto a la base de datos
// Pintar en mapa

getPinCoords(url)

