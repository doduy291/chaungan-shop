const db = require('../server');
const DBkho = db.kho;
const DBsanpham = db.sanpham;
const DBphieunhap = db.phieunhap;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

exports.findAllKho = (req, res) => {
  DBkho.findAll({
    include: [
      {
        model: DBsanpham,
        attributes: ['idsanpham', 'tensanpham'],
      },
      {
        model: DBphieunhap,
        attributes: ['idphieunhap', 'sophieunhap'],
      },
    ],
  })
    .then((data) => {
      res.render('admin/pages/tables/kho', { listKho: data });

      //testing
      // return res.status(200).json({
      //   message: 'Hiển thị tồn kho thành công',
      // });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
