const jwt = require('jsonwebtoken')
const moment = require('moment')
const usersModel = require('../models/users')

const checkToken = (req, res, next) => {
    if(!req.headers['user-token']){
        return res.json({error: 'debes incluir el token dentro de la cabecera usuario-token'})
    }

    const userToken = req.headers['user-token']
    try{
        const payload = jwt.verify(userToken, process.env.SECRET_KEY)
    }catch(err){
        return res.json({error: 'el token es incorrecto'})
    }

    const currentDate = moment().unix()
    if(currentDate > payload.expiredAt){
        return res.json({error: 'el token está caducado'})
    }

    req.payload = payload

    next()
}

module.exports = {
    checkToken
}