const db = require('../server');
const DBnguoidung = db.nguoidung;
const DBkhachhang = db.khachhang;
const DBHoaDon = db.hoadon;
const DBnonkhachhang = db.nonkhachhang;
const DBchitiettrahang = db.chitiettrahang;
const DBtrahang = db.trahang;
const DBsanpham = db.sanpham;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const { where } = require('sequelize');

exports.findHDKhachNo = async (req, res) => {
  // lay hoa don khach no hom nay
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  const getHDKhachNo = await DBHoaDon.findAll({
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
          congno: {
            [Op.gt]: 0,
          },
        },
      ],
    },
    include: [
      {
        model: DBkhachhang,
        attributes: ['idkhachhang', 'tenkhachhang', 'sodienthoai'],
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
  });
  var HDkhachno = [];
  var x = JSON.stringify(getHDKhachNo);
  HDkhachno.push(JSON.parse(x));

  // lay hoa don hang khach tra
  const getHDHangKhachTra = await DBchitiettrahang.findAll({
    include: [
      {
        model: DBtrahang,
        where: {
          [Op.and]: [
            {
              ngaynhan: Sequelize.where(
                Sequelize.fn('day', Sequelize.col('ngaynhan')),
                day
              ),
            },
            {
              ngaynhan: Sequelize.where(
                Sequelize.fn('month', Sequelize.col('ngaynhan')),
                month
              ),
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
        ],
      },
      {
        model: DBsanpham,
        attributes: ['idsanpham', 'tensanpham'],
      },
    ],
  });
  var HDkhachtra = [];
  var x = JSON.stringify(getHDHangKhachTra);
  HDkhachtra.push(JSON.parse(x));

  res.render('admin/pages/tables/hangkhachtravakhachno', {
    HDKN: getHDKhachNo,
    HKT: getHDHangKhachTra,
  });

  // res.send(HDkhachtra);
};
