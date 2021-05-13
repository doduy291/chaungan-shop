const db = require('../server');
const DBphieunhap = db.phieunhap;
const DBnhacungcap = db.nhacungcap;
const DBnguoidung = db.nguoidung;
const Op = db.Sequelize.Op;

// Danh sách phiếu nhập
exports.findAllPN = (req, res) => {
  DBphieunhap.findAll({
    include: [
      {
        model: DBnhacungcap,
        attributes: ['idnhacungcap', 'tennhacungcap'],
      },
      {
        model: DBnguoidung,
        attributes: ['idnguoidung', 'tennguoidung'],
      },
    ],
    order: [['idphieunhap', 'DESC']],
  })
    .then((data) => {
      res.render('admin/pages/tables/phieunhap', { listPN: data });

      //testing
      // return res.status(200).json({
      //   message: 'Hiển thị nhập kho thành công',
      // });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving phieunhap!',
      });
    });
};
