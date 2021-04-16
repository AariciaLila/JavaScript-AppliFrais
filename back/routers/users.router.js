const express = require('express')
const userController = require('../controllers/users.controller') // LES 2 .. PERMETTENT DE SORTIR DU DOSSIER
let router = express()


// AFFICHAGE - RECUPERER DONNEES BDD

router.get('/', userController.searchAll)

router.put('/:id', userController.updateUser)

router.delete('/delete/:id', userController.deleteUser)


// AFFICHE LISTE DES USERS    response.json({users: dbUser})          localhost:3000/users


router.get('/:id', (request, response) => {
    const id = request.params.id
    const result = userController.search(id)
    response.json(result)
})

// CREATION - INSERTION BDD
router.post('/', userController.addUser)

// MODIFICATION BDD 
/*
router.put('/', (request, response) => {
    let body = request.body
    const user = userController.modify(body)
    response.json(user)
})*/

// SUPPRESSION BDD
/*
router.delete('/', (request, response) => {
    let body = request.body
    const user = userController.remove(body)
    response.json(user)
})*/

// EXPORT DU ROUTEUR POUR POUVOIR L APPELER DS INDEX.JS ET LE LIER A UNE URL
module.exports = router
