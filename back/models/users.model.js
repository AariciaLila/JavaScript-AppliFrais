const connection = require('../config/db')  // IMPORTE CONNEXION


const addUser = (user, callback) => {
   
    // DECLARATION ET INSTANCIATION
    var query =  'INSERT INTO utilisateur (id, nom, prenom, login, mdp, adresse, cp, ville, dateEmbauche, role ) VALUES (?)'
    var values = [user.id, user.nom, user.prenom, user.login, user.mdp, user.adresse, user.cp, user.ville, user.dateEmbauche, user.role ]
    // EXECUTION DE LA REQUETE
    connection.query(query, [values], callback)
  
}

const updateUser = (id, user, callback) => {
    
    var query =  'UPDATE utilisateur SET nom=(?), prenom=(?), login=(?), mdp=(?), adresse=(?), cp=(?), ville=(?), dateEmbauche=(?), role=(?) WHERE id= (?)'
    var values = [user.nom, user.prenom, user.login, user.mdp, user.adresse, user.cp, user.ville, user.dateEmbauche, user.role, id]
    connection.query(query, values, callback)
    
}
const deleteUser = (id, callback) => {
    
    var query1 =  'DELETE FROM utilisateur WHERE id= (?)'
    connection.query(query1, id, callback)
    
}


/* AJOUT UTILISATEUR EN BRUT
const addUser = (callback) => {
    connection.connect()
    var query =  'INSERT INTO utilisateur (id, nom, prenom, login, mdp, adresse, cp, ville, dateEmbauche, role ) VALUES (?)'
    var values = ['test', 'test', 'test', 'test', 'test', 'test', '69000', 'test', '2020-12-12', 'test']
    connection.query(query, [values], callback)
    connection.end()
}
*/
const searchAll = (callback) => {       // PREND EN PARAMETRE UN CALL BACK 
    
    connection.connect()    // CONNEXION A LA BDD
    connection.query('SELECT * from utilisateur', (callback))
    connection.end()    // FERMETURE CONNEXION A LA BDD
}

module.exports = {
    searchAll,
    addUser,
    updateUser,
    deleteUser
}

/* 
INSERER UN UTILISATEUR SAISIR UTILISATEUR
model controller routeur
ajouter supprimer modifier
*/