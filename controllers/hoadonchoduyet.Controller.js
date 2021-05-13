const db = require('../server');
const DBnguoidung = db.nguoidung;
const DBkhachhang = db.khachhang;
const DBHoaDon = db.hoadon;
const DBnonkhachhang = db.nonkhachhang;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const { where } = require('sequelize');

exports.findAllHDchoduyet = (req, res) => {
  // lay don chua duyet trong ngay
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  DBHoaDon.findAll({
    where: {
      [Op.and]: [
        {
          ngaytaohoadon: Sequelize.where(
            Sequelize.fn('day', Sequelize.col('ngaytaohoadon')),
            day
          ),
        },
        {
          ngaytaohoadon: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
            month
          ),
        },
        {
          trangthaihoadon: 1,
        },
      ],
    },
    include: [
      {
        model: DBkhachhang,
        attributes: ['idkhachhang', 'tenkhachhang'],
      },
      {
        model: DBnguoidung,
        attributes: ['idnguoidung', 'tennguoidung'],
      },
      {
        model: DBnonkhachhang,
        attributes: ['idnonkhachhang', 'hovaten'],
      },
    ],
    order: [['idhoadon', 'DESC']],
  })
    .then((data) => {
      res.render('admin/pages/tables/hoadonchoduyet', {
        listHDchuaduyet: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Update a trang thai hoa don
exports.update = function (req, res) {
  DBHoaDon.update(
    { trangthaihoadon: 2 },
    {
      where: { idhoadon: req.params.id },
    }
  )
    .then((data) => {
      res.redirect('back');
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Tutorial with id=' + id,
      });
    });
};
