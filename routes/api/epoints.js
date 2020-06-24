const router = require("express").Router();
const axios = require('axios')
const cheerio = require('cheerio')
const epointsModel = require('../../models/epoints')

const url = 'https://www.ecolec.es/reciclar-aparatos-electronicos/'
const arrPins= []

async function getPinCoords(pUrl){
    const { data } = await axios.get(url)
    const response = await axios.get(`${pUrl}`)
    const $ = cheerio.load(response.data)

    const coords = $('#pickUpPointsMap')

    console.log(coords.attribs)
}

router.get('/', async(req, res) => {
    try{
        const rows = await epointsModel.getAll()
        res.json(rows)
    }catch (err) {
        res.status(500).json({ error: err.message });
  }
})

module.exports = router