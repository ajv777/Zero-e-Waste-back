const jwt = require('jsonwebtoken')
const moment = require('moment')
const usersModel = require('../models/users')
const multipart = require('connect-multiparty')


// Check the token we get in the head
const checkToken = (req, res, next) => {

    // Check if token comes from the head
    if(!req.headers['user-token']){
        return res.status(401).json({error: 'debes incluir el token dentro de la cabecera user-token'})
    }

    // Check if token is correct
    const userToken = req.headers['user-token']
    try{
        req.token = jwt.verify(userToken, process.env.SECRET_KEY)

        next()

    }catch(err){
        return res.status(401).json({error: 'el token es incorrecto'})
    }

}

const multipartMW = multipart({
    uploadDir: './media'
})

module.exports = {
    checkToken, multipartMW
}