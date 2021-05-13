const db = require('../server');
const DBsanpham = db.sanpham;
const DBhoadon = db.hoadon;
const DBchitiethoadon = db.chitiethoadon;
const DBkhachhang = db.khachhang;
const DBnonkhachhang = db.nonkhachhang;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const common = require('./common.Controller');

exports.getHome = async (req, res) => {
  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );
      if (req.khachhang) {
        res.render('pages/home-03', {
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
    if (req.sessionID) {
      try {
        const infoNonKH = await DBnonkhachhang.findOne({
          where: { sessionID: req.sessionID },
        });
        if (infoNonKH !== null) {
          const { listCart, totalPrice, countSP } = await common.cartNonKH(
            infoNonKH.idnonkhachhang
          );
          console.log(listCart);
          res.render('pages/home-03', {
            listCart: listCart,
            totalPrice: totalPrice,
            countSP: countSP,
            emailkhachhang: null,
          });
        } else {
          res.render('pages/home-03', {
            listCart: null,
            totalPrice: null,
            countSP: null,
            emailkhachhang: null,
          });
        }
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};
