// 4-1 Importer les modules
const {somme, produit, success, error} = require('functions')
const bodyParser = require('body-parser') 
const express = require('express') 
const app = express() 
const morgan = require('morgan') 
const config = require('./config') 

// 4-2 Declarer le gestionnaire des routes
let CalculRouter = express.Router();

// 4-3 Declarer les middlewares
app.use(morgan('dev'))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// autoriser les requettes ajax entre domaine(XHR cross domain)
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
}); 

// 4-4 Gérer les routes

// Route Somme
CalculRouter.route('/somme') 
    .get((req, res) => {
        let nb1=req.query.n1 ;
        let nb2=req.query.n2 ;
        let r=somme(nb1,nb2);
        res.json(success("la somme de "+nb1+" et "+nb2+" est:"+r));
    })
    .post((req, res) => { 
        let nb1=req.body.n1; 
        let nb2=req.body.n2; 
        let r=somme(nb1,nb2); 
        res.json(success("la somme de "+nb1+" et "+nb2+" est:"+r)); 
    })

// Route Produit
CalculRouter.route('/produit') 
    .get((req, res) => {
        let nb1=req.query.n1 ;
        let nb2=req.query.n2;
        let r=produit(nb1,nb2);
        res.json(success("le produit de "+nb1+" et "+nb2+" est:"+r));
    })
    .post((req, res) => { 
        let nb1=req.body.n1; 
        let nb2=req.body.n2; 
        let r=produit(nb1,nb2); 
        res.json(success("le produit de "+nb1+" et "+nb2+" est:"+r)); 
    })

// Route racine pour tester
app.get('/', (req, res) => {
    res.send('API fonctionne ! Utilisez /api/v1/calculs/somme ou /api/v1/calculs/produit');
});

app.use(config.rootAPI + 'calculs', CalculRouter)

app.listen(config.port, () => console.log('Started on port '+config.port))

module.exports = app;
