let express = require('express');
let app = express();

let session = require('express-session');
//il est indispensable que app.use(session) suive let session sinon erreur
app.use(session({
    secret:'my secret',
    resave:false,                
    saveUninitialized: true
}));
//idem pour express.urlencoded
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public'));

let router = require('./routes');
app.use('/',router);


app.listen(8000,function(){
    console.log('running on port 8000')
});