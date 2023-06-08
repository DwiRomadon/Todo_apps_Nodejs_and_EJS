const express = require('express').Router()
const controller = require('../controller/Auth')

express.get('/', controller.login)
express.get('/register', controller.register)
express.post('/post-register', controller.postRegistrasi)
express.post('/post-login', controller.postLogin)
express.get('/log-out', controller.logOut)

module.exports = express