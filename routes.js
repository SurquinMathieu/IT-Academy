let express = require('express');
let router = express.Router();

let formationController = require('./controllers/formationController')

router.get('/',formationController.redirectToFormationList)
router.get('/formations',formationController.formationsList);
router.get('/connection',formationController.connection);
router.get('/formation/add/:index',formationController.addToBasket);
router.get('/formations/basket',formationController.goToBasket);
router.get('/formation/delete/:index',formationController.deleteFromBasket);
router.get('/formations/finalize',formationController.finalizeFormations);
router.post('/formation/connected',formationController.formationsConnected);

module.exports = router;