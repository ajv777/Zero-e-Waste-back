const jwt = require('jsonwebtoken')
const moment = require('moment')
const usersModel = require('../models/users')

// Check the token we get in the head
const checkToken = (req, res, next) => {

    // Check if token comes from the head
    if(!req.headers['user-token']){
        return res.json({error: 'debes incluir el token dentro de la cabecera user-token'})
    }

    // Check if token is correct
    const userToken = req.headers['user-token']
    try{
        const payload = jwt.verify(userToken, process.env.SECRET_KEY)
    }catch(err){
        return res.json({error: 'el token es incorrecto'})
    }

    // Check if token is expired
    /* const currentDate = moment().unix()
    if(currentDate > payload.expiredAt){
        return res.json({error: 'el token está caducado'})
    } */

    // Include desencrypted data
    req.payload = payload

    next()
}

module.exports = {
    checkToken
}