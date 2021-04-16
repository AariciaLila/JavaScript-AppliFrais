const connection = require('../config/db')  // IMPORTE CONNEXION



// Fonction Ligne Frais Forfait
const addLigneFraisForfait = (ligneFraisForfait, callback) => {
    var values = [ligneFraisForfait.idutilisateur,ligneFraisForfait.mois,ligneFraisForfait.idFraisForfait,ligneFraisForfait.quantite]
    
    connection.query("INSERT INTO lignefraisforfait (idutilisateur, mois, idFraisForfait, quantite) VALUES (?)", [values], callback)
    
}

const updateLigneFraisForfait = (id, mois, idFraisForfait,ligneFraisForfait, callback) => {
    var values = [ligneFraisForfait.quantite, id, mois, idFraisForfait]
    console.log(values)
    
    connection.query("UPDATE lignefraisforfait SET quantite = (?) WHERE idutilisateur= (?) AND mois = (?) AND idFraisForfait = (?)", values, callback)   

}

const deleteLigneFraisForfait = (id, mois, idFraisForfait, callback) => {
    var values = [id, mois, idFraisForfait]
    
    connection.query('DELETE FROM lignefraisforfait WHERE idutilisateur=(?) AND mois=(?) AND idFraisForfait = (?)', values , callback)
    

}

//fonction ligne hors forfait

// Ajoutez une colonne Justificatif ?
const addLigneFraisHorsForfait = (ligneFraisHorsForfait, callback) => {
    var values = [ligneFraisHorsForfait.id,ligneFraisHorsForfait.idutilisateur,ligneFraisHorsForfait.mois,ligneFraisHorsForfait.libelle,ligneFraisHorsForfait.date, ligneFraisHorsForfait.montant]
    
    connection.query("INSERT INTO lignefraishorsforfait (id, idutilisateur, mois, libelle, date, montant) VALUES (?)", [values], callback)
    

}
const updateLigneFraisHorsForfait = ( ligneFraisHorsForfait, id, callback) => {
    var values = [ligneFraisHorsForfait.libelle,ligneFraisHorsForfait.date,ligneFraisHorsForfait.montant, id]
    
    connection.query("UPDATE lignefraishorsforfait SET libelle =(?), date=(?), montant=(?) WHERE id = (?)", values, callback)
    

}

const deleteLigneFraisHorsForfait = (id, callback) => {
    
    connection.query('DELETE FROM lignefraishorsforfait WHERE  id = (?)', id , callback)
    

}


const addFiche = (fiche, callback) => {
   
    var query =  'INSERT INTO lignefraisforfait (idutilisateur, mois, idFraisForfait, quantite) VALUES (?)'
    var values = [fiche.idutilisateur, fiche.mois, fiche.idFraisForfait, fiche.quantite]
    console.log(fiche.idutilisateur, fiche.mois, fiche.idFraisForfait, fiche.quantite)
    connection.query(query, [values], callback)
   
}

const updateFiche = (idutilisateur, mois, fiche, callback) => {
    
    var query =  'UPDATE fichefrais SET nbJustificatifs=(?), montantValide=(?), dateModif=(?), idEtat=(?) WHERE idutilisateur= (?) AND mois= (?)'
    var values = [fiche.nbJustificatifs, fiche.montantValide, fiche.dateModif, fiche.idEtat, idutilisateur, mois]
    connection.query(query, values, callback)
    
}
const deleteFiche = (idutilisateur, mois, callback) => {
    
    var query1 =  'DELETE FROM fichefrais WHERE idutilisateur= (?) AND mois= (?)'
    connection.query(query1, idutilisateur, mois, callback)
   
}

const search = (idutilisateur, mois, callback) => {       // PREND EN PARAMETRE UN CALL BACK 
    
    connection.query('SELECT * FROM fichefrais WHERE idutilisateur= (?) AND mois= (?)', [idutilisateur, mois], callback)
    
}

const searchAll = (callback) => {       // PREND EN PARAMETRE UN CALL BACK 
    
    connection.query('SELECT * FROM fichefrais', callback)
    
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
