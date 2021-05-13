const express = require('express');

const authController = require('../controllers/auth.Controller');
const errorController = require('../controllers/error.Controller');
const validate = require('../middleware/validator');
//Router
const router = express.Router();

router.route('/').get((req, res) => {
  res.render('auth/auth');
});

router.route('/api/auth/logout').get(authController.logout);
router
  .route('/api/auth/signup')
  .post(
    validate.validateSignUp(),
    errorController.errorValidateSignUp,
    authController.signup
  );

router
  .route('/api/auth/signin')
  .post(
    validate.validateSignIn(),
    errorController.errorValidateSignIn,
    authController.signin
  );
router.route('/forgot-password').get((req, res) => {
  const message_success = req.flash('message_success');
  const message_err = req.flash('message_err');
  res.render('auth/forgotPassword', {
    message_success: message_success,
    message_err: message_err,
  });
});
router.route('/get-code-reset').post(authController.getCodeResetPass);
router.route('/reset-password/:token').get(authController.resetPassword);
router
  .route('/update-new-password/:token')
  .post(authController.updateNewPassword);
module.exports = router;
