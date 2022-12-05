let Formation = require('../models/formationModel');
let mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'formations'
});

let formationsList = [];
let basket = [];
connection.query('SELECT * FROM formation', function(error, result) {
    if (error) console(error);
    result.forEach(element => {
        let formation = new Formation(element.idformation, element.Nom,element.Prix,element.Debut,element.Fin); //noms des colonnes de la base
        formationsList.push(formation);
    })

});

exports.redirectToFormationList = function(request, response){
    response.redirect('/formations')
}

exports.formationsList = function(request, response){
    response.render('formationsList.ejs',{formations: formationsList})
}

exports.connection = function(request, response){
    response.render('connection.ejs');
}

exports.addToBasket = function(request,response){
    let index = request.params.index;
    if (basket.includes(formationsList[index])==false) {
    basket.push(formationsList[index]);
    }
    response.redirect('/formations')
}

exports.goToBasket = function(request,response){
    response.render('basket.ejs',{basket:basket})
}

exports.deleteFromBasket = function(request,response){
    index = request.params.index;
    basket.splice(index,1)
    response.render('basket.ejs',{basket:basket})
}

exports.finalizeFormations = function (request, response) {
	if (request.session.user == undefined) {
        console.log(request.session)
		response.render('connection.ejs');
	}
    else if (basket.length>0) {
        let order = {'nom_client': request.session.user, 'idformations':''}
        let formationsid = [];
        basket.forEach(element =>{
            formationsid.push(element.id);
        });
        order['idformations'] = formationsid.toString();
        connection.query('insert INTO commandes SET ?',order,function(error,result){
            if (error){
                console.log(error);
            }
        });
        response.send('Merci ' + request.session.user + ', votre inscription a bien été enregistrée')
    }
}

exports.formationsConnected = function (request, response){
    let name = request.body.nom;
    request.session.user = name;
    console.log(request.session.user)
    response.render('formationsList.ejs',{formations : formationsList})
}