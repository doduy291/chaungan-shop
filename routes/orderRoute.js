const express = require('express');
const orderController = require('../controllers/order.Controller');
const authJwt = require('../middleware/authJwt');
const errorController = require('../controllers/error.Controller');
const validate = require('../middleware/validator');

//Router
const router = express.Router();

router
  .route('/addtocart')
  .post(
    authJwt.verifyToken,
    validate.validateAddToCart(),
    errorController.errorValidateAddToCart,
    orderController.addToCart
  );
router
  .route('/placeorder')
  .post(
    authJwt.verifyToken,
    validate.validateCheckout(),
    errorController.errorValidateCheckout,
    orderController.placeOrder
  );
module.exports = router;
