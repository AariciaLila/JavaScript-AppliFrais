// DECLARATION
const express = require('express')
const bodyParser = require('body-parser')
const routerUsers = require('./routers/users.router')
const routerFiches = require('./routers/fichedefrais.router')


// INSTANCIATION
let api = express()

// CONSTRUCTEUR PAR DEFAUT = AUCUN PARAMETRE

//sur la methode GET de la route principale / on envoi la requete et la reponse qui ns renvoi un json qui contiendra le statut ok
api.get('/', (request, response) => {
    response.json({status:'ok'})
})

// RECUPERE LE BODY - DECODER LA REQUETE
api.use(bodyParser.urlencoded({ extended: true}))
api.use(bodyParser.json())

// PERMET DE COMMUNIQUER AVEC NOTRE API DEPUIS L EXTERIEUR
api.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
})

// USE METHODE EXPRESS : NE PAS OUBLIER EXPORT
api.use('/users', routerUsers)
api.use('/fiches', routerFiches)



// OUVRIR NAVIGATEUR localhost:3000
api.listen(3001)
