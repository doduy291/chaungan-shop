const db = require('../server');
const DBkhachhang = db.khachhang;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const common = require('./common.Controller');

exports.getInfoAbout = async (req, res) => {
  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );

      if (req.khachhang) {
        res.render('pages/about', {
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          emailkhachhang: infokhachhang.email,
          role: infokhachhang.role,
        });
      }
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }
  } else {
    try {
      res.render('pages/about', {
        listCart: null,
        totalPrice: null,
        countSP: null,
        emailkhachhang: null,
      });
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }
  }
};

exports.getInfoContact = async (req, res) => {
  var listCart = [];

  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );

      if (req.khachhang) {
        res.render('pages/contact', {
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          emailkhachhang: infokhachhang.email,
          role: infokhachhang.role,
        });
      }
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }
  } else {
    try {
      res.render('pages/contact', {
        listCart: null,
        totalPrice: null,
        countSP: null,
        emailkhachhang: null,
      });
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }
  }
};
