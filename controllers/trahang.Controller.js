const db = require('../server');
const DBtrahang = db.trahang;
const DBhoadon = db.hoadon;
const DBkhachhang = db.khachhang;
const DBnguoidung = db.nguoidung;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const { sequelize } = require('../server');

exports.findAllTH = (req, res) => {
  DBtrahang.findAll({
    include: [
      {
        model: DBhoadon,
        attributes: ['idhoadon', 'sohoadon'],
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
    order: [['idtrahang', 'DESC']],
  })
    .then((data) => {
      res.render('admin/pages/tables/trahang', { listTH: data });

      // testing
      // return res.status(200).json({
      //   message: 'Hiển thị trả hàng thành công',
      // });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
