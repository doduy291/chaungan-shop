const jwt = require('jsonwebtoken');
const db = require('../server');
const DBkhachhang = db.khachhang;

exports.verifyToken = async (req, res, next) => {
  let token = req.cookies['my-token'];
  if (token) {
    jwt.verify(token, 'superchaungan-secret-key', (err, decoded) => {
      if (decoded) {
        req.khachhang = decoded;
        req.token = token;
      }
    });
    next();
  } else {
    next();
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.khachhang !== undefined) {
    DBkhachhang.findOne({
      where: { idkhachhang: req.khachhang.idkhachhang },
    }).then((dataKH) => {
      if (dataKH.role === 'admin') {
        next();
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
};
