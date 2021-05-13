const db = require('../server');
const DBthuchi = db.thuchi;
const DBnhacungcap = db.nhacungcap;
const DBkhachhang = db.khachhang;
const DBnguoidung = db.nguoidung;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

exports.findAllTC = (req, res) => {
  DBthuchi.findAll({
    include: [
      {
        model: DBnhacungcap,
        attributes: ['idnhacungcap', 'tennhacungcap'],
      },
      {
        model: DBkhachhang,
        attributes: ['idkhachhang', 'tenkhachhang'],
      },
      {
        model: DBnguoidung,
        attributes: ['idnguoidung', 'tennguoidung'],
      },
    ],
    order: [['idthuchi', 'DESC']],
  })
    .then((data) => {
      res.render('admin/pages/tables/thuchi', { listTC: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
