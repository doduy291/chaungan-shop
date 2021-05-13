const { Sequelize } = require('../server');
const db = require('../server');
const DBkhachhang = db.khachhang;
const DBloaikhachhang = db.loaikhachhang;
const Op = db.Sequelize.Op;

// Tim tat ca hangsanpham

exports.findAllKhachHang = (req, res) => {
  DBkhachhang.findAll({
    include: [
      {
        model: DBloaikhachhang,
        attributes: ['idloaikhachhang', 'tenloaikhachhang'],
      },
    ],
  })
    .then((data) => {
      res.render('admin/pages/tables/khachhang', { listKhachHang: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving hangsanpham.',
      });
    });
};
