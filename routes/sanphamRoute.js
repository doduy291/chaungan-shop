const express = require('express');
const sanphamController = require('./../controllers/sanpham.Controller');
const authJwt = require('../middleware/authJwt');

//Router
const router = express.Router();
router.route('/').get(authJwt.verifyToken, sanphamController.findAllSP);
router.route('/filter/').get(authJwt.verifyToken, sanphamController.pagination);

module.exports = router;
