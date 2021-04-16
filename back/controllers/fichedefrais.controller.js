const {response} = require('express')        // CONTROLLER GERE LE MODEL
const ficheModel = require('../models/fichedefrais.model')



//Fonction Ligne frais forfait

const addLigneFraisForfait = (request,response) => {
    const body = request.body
    ficheModel.addLigneFraisForfait(body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

const updateLigneFraisForfait = (request,response) => {
    const body = request.body
    ficheModel.updateLigneFraisForfait(request.params.id, request.params.mois, request.params.idFraisForfait, body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

const deleteLigneFraisForfait = (request,response) => {
    ficheModel.deleteLigneFraisForfait(request.params.id, request.params.mois, request.params.idFraisForfait, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

//Fonction ligne Hors forfait
const addLigneFraisHorsForfait = (request,response) => {
    const body = request.body
    ficheModel.addLigneFraisHorsForfait(body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

const updateLigneFraisHorsForfait = (request,response) => {
    const body = request.body
    ficheModel.updateLigneFraisHorsForfait(body, request.params.id,(err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

const deleteLigneFraisHorsForfait = (request,response) => {
    ficheModel.deleteLigneFraisHorsForfait(request.params.id, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

const search = (request, response) => {
    ficheModel.search(request.params.idutilisateur, request.params.mois, (err, result) => {
        response.json({result})
    })
}
const searchAll = (request, response) => {
    ficheModel.searchAll((err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

const addFiche = (request, response) => {
    var body = request.body
    ficheModel.addFiche(body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

/* request.params.id RECUPERE ID SUR POSTMAN*/
const updateFiche = (request, response) => {
    var body = request.body
    ficheModel.updateFiche(request.params.id, request.params.mois, body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}
const deleteFiche = (request, response) => {  
        ficheModel.deleteFiche(request.params.id, request.params.mois, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}

module.exports = {
    search,
    searchAll,
    addFiche,
    updateFiche,
    deleteFiche,
    addLigneFraisForfait,
    addLigneFraisHorsForfait,
    updateLigneFraisForfait,
    updateLigneFraisHorsForfait,
    deleteLigneFraisForfait,
    deleteLigneFraisHorsForfait
}