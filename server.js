// Criando as váriaveis para setar as dependências
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const server = express()

server.set('view engine', 'njk')

server.use(express.urlencoded({extended: true}))
server.use(routes)
server.use(express.static('public'))

nunjucks.configure('views', {
    express: server,
    autoescape:false,
    noCache: true
})

server.listen(5000, function() {
    console.log ('server is running')
})