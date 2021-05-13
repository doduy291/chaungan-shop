const db = require('../server');
const DBhoatdong = db.hoatdong;
const DBloaihoatdong = db.loaihoatdong;
const DBnguoidung = db.nguoidung;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const { sequelize } = require('../server');

exports.findAllHoatDong = (req, res) => {
  DBhoatdong.findAll({
    include: [
      {
        model: DBloaihoatdong,
        attributes: ['idloaihoatdong', 'tenloaihoatdong'],
      },
      {
        model: DBnguoidung,
        attributes: ['idnguoidung', 'tennguoidung'],
      },
    ],
    order: [['idhoatdong', 'DESC']],
  })
    .then((data) => {
      res.render('admin/pages/tables/hoatdong', { listHoatDong: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
