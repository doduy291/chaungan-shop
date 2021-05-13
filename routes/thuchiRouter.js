const express = require('express');
const thuchi = require('../controllers/thuchi.Controller');
const authJwt = require('../middleware/authJwt');

//Router
const router = express.Router();

router
  .route('/thuchi')
  .get(authJwt.verifyToken, authJwt.isAdmin, thuchi.findAllTC);

module.exports = router;
