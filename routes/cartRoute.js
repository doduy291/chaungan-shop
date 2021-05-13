const express = require('express');
const cartController = require('../controllers/cart.Controller');
const authJwt = require('../middleware/authJwt');

//Router
const router = express.Router();

router.route('/').get(authJwt.verifyToken, cartController.getCart);
router
  .route('/checkout')
  .get(authJwt.verifyToken, cartController.checkOutBillDetail);
router
  .route('/checkout/success')
  .get(authJwt.verifyToken, cartController.checkoutSuccess);
router.route('/removePrdCart/:id').get(cartController.deleteOneCart);
router.route('/tim-kiem-hd').get(authJwt.verifyToken, cartController.timkiemhd);
router
  .route('/send-cancel-code')
  .post(authJwt.verifyToken, cartController.sendEmailCancelOrderCode);
router
  .route('/confirm-cancel-order')
  .post(
    authJwt.verifyToken,
    cartController.confirmCancelOrder,
    cartController.timkiemhd
  );
module.exports = router;
