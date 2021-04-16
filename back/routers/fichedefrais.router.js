const express = require('express')
const ficheController = require('../controllers/fichedefrais.controller') // LES 2 .. PERMETTENT DE SORTIR DU DOSSIER
let router = express()


// AFFICHAGE
router.get('/:id/:mois', ficheController.search)
router.get('/all', ficheController.searchAll)

// CREATION 
router.post('/', ficheController.addFiche)
router.post('/lignefraisforfait/new', ficheController.addLigneFraisForfait)
router.post('/lignefraishorsforfait/new', ficheController.addLigneFraisHorsForfait)


// MODIFICATION
router.put('/:id/:mois', ficheController.updateFiche)
router.put('/lignefraisforfait/update/:id/:mois', ficheController.updateLigneFraisForfait)
router.put('/lignefraishorsforfait/update/:id/:mois', ficheController.updateLigneFraisHorsForfait)


// SUPPRESSION
router.delete('/delete/:id/:mois', ficheController.deleteFiche)
router.delete('/lignefraisforfait/delete/:id/:mois', ficheController.deleteLigneFraisForfait)
router.delete('/lignefraishorsforfait/delete/:id/:mois', ficheController.deleteLigneFraisHorsForfait)


// EXPORT DU ROUTEUR POUR POUVOIR L APPELER DS INDEX.JS ET LE LIER A UNE URL
module.exports = router
