const express = require('express');
const indexController = require('../controllers/index.Controller');
const infoController = require('../controllers/info.Controller');
const authJwt = require('../middleware/authJwt');

//Router
const router = express.Router();

router.route('/').get(authJwt.verifyToken, indexController.getHome);
router.route('/about').get(authJwt.verifyToken, infoController.getInfoAbout);
router
    .route('/contact')
    .get(authJwt.verifyToken, infoController.getInfoContact);


module.exports = router;
