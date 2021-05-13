const { validationResult } = require('express-validator');
const db = require('../server');
const DBsanpham = db.sanpham;
const DBhoadon = db.hoadon;
const DBchitiethoadon = db.chitiethoadon;
const DBkhachhang = db.khachhang;
const DBnonkhachhang = db.nonkhachhang;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const common = require('./common.Controller')

exports.errorValidateSignIn = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errors_signin = error.array();
    res.render('auth/auth', { errors_signin });

    //testing
    // return res.status(200).json({
    //   message: errors_signin,
    //   message_sql: 'Đăng nhập không thành công',
    // });
  } else {
    //testing
    // return res.status(200).json({
    //   message: 'Đăng nhập thành công',
    // });

    next();
  }
};

exports.errorValidateSignUp = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errors_signup = error.array();
    res.render('auth/auth', { errors_signup });

    //testing
    // return res.status(200).json({
    //   message: errors_signup,
    //   message_sql: 'Đăng ký không thành công',
    // });
  } else {
    //testing
    // return res.status(200).json({
    //   message: 'Đăng ký thành công',
    // });

    next();
  }
};

exports.errorValidateAddToCart = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errors_addtocart = error.array();
    return res.status(422).jsonp(errors_addtocart);

    //testing
    // return res.status(200).json({
    //   message: 'Thêm sản phẩm không thành công',
    // });
  } else {
    next();
  }
};

exports.errorValidateCheckout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errors_checkout = error.array();
    const giasale = req.session.giasale;
    if (req.khachhang !== undefined) {
      try {
        const infokhachhang = await DBkhachhang.findOne({
          where: { idkhachhang: req.khachhang.idkhachhang },
        });
        const { listCart, totalPrice, countSP } = await common.cartKH(
          req.khachhang.idkhachhang
        );
        if (req.khachhang) {
          res.render('order/checkout', {
            listCart: listCart,
            totalPrice: totalPrice,
            countSP: countSP,
            infoKH: infokhachhang,
            emailkhachhang: infokhachhang.email,
            errors_checkout,
            role: infokhachhang.role,
            giasale: giasale
          });
        }
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    } else {
      if (req.sessionID) {
        try {
          const infoNonKH = await DBnonkhachhang.findOne({
            where: { sessionID: req.sessionID },
          });
          const { listCart, totalPrice, countSP } = await common.cartNonKH(
            infoNonKH.idnonkhachhang
          );

          res.render('order/checkout', {
            listCart: listCart,
            totalPrice: totalPrice,
            countSP: countSP,
            infoKH: null,
            emailkhachhang: null,
            errors_checkout,
            giasale: 0
          });
        } catch (err) {
          console.log('Http error', err);
          return res.status(500).send();
        }
      }
    }
  } else {
    next();
  }
};
