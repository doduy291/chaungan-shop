const express = require('express');
const sanphamController = require('./../controllers/sanpham.Controller');
const authJwt = require('../middleware/authJwt');

//Router
const router = express.Router();

router
  .route('/:tensanpham')
  .get(authJwt.verifyToken, sanphamController.findDetailSP);

router
  .route('/get-price-size-color')
  .post(authJwt.verifyToken, sanphamController.getPriceColorSize);
module.exports = router;
