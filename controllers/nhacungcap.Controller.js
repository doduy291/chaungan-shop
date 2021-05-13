const db = require('../server');
const DBnhacungcap = db.nhacungcap;
const DBloainhacungcap = db.loainhacungcap;
const DBnguoidung = db.nguoidung;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const { sequelize } = require('../server');

exports.findAllNCC = (req, res) => {
  DBnhacungcap.findAll({
    include: [
      {
        model: DBloainhacungcap,
        attributes: ['idloainhacungcap', 'tenloainhacungcap'],
      },
      {
        model: DBnguoidung,
        attributes: ['idnguoidung', 'tennguoidung'],
      },
    ],
  })
    .then((data) => {
      res.render('admin/pages/tables/nhacungcap', { listNCC: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
