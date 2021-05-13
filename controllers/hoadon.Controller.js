const db = require('../server');
const DBnguoidung = db.nguoidung;
const DBkhachhang = db.khachhang;
const DBHoaDon = db.hoadon;
const DBsanpham = db.sanpham;
const DBchitiethoadon = db.chitiethoadon;
const DBnonkhachhang = db.nonkhachhang;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const { sequelize } = require('../server');

exports.findAllHD = (req, res) => {
  const message_err = req.flash('message_err');
  DBHoaDon.findAll({
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
      res.render('admin/pages/tables/hoadon', {
        listHD: data,
        message_err: message_err,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findDetailHD = async (req, res) => {
  const getDetailHD = await DBHoaDon.findAll({
    where: {
      idhoadon: req.params.id,
    },
    include: [
      {
        model: DBkhachhang,
        attributes: ['idkhachhang', 'tenkhachhang'],
      },
      {
        model: DBnonkhachhang,
        attributes: ['idnonkhachhang', 'hovaten'],
      },
      {
        model: DBsanpham,
        as: 'sanphams',
        attributes: ['idsanpham', 'masanpham', 'tensanpham', 'giabanle'],
        through: [
          {
            model: DBchitiethoadon,
            attributes: [
              'idchitiethoadon',
              'soluong',
              'thanhtien',
              'uudai',
              'ghichu',
            ],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });
  res.render('admin/pages/tables/chitiethoadon', {
    DetailHD: getDetailHD,
  });

  //testing
  // return res.status(200).json({
  //   message: 'Hiển thị chi tiết hóa đơn thành công',
  //   DetailHD: getDetailHD,
  // });
};
//<=======================================================================================>

// TÌM bằng ngày tạo HÓA ĐƠN
exports.findSearchHD = async (req, res) => {
  const timeselect = req.query.timeselect;
  const loaihoadon = req.query.loaihoadon;
  const firstdate = req.query.first_date;
  const enddate = req.query.end_date;
  const formatenddate = new Date(req.query.end_date);
  formatenddate.setDate(formatenddate.getDate() + 1);
  const today = new Date().toISOString().substr(0, 10);
  const todayaddone = new Date(today);
  todayaddone.setDate(todayaddone.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const sevendaysago = new Date(today);
  sevendaysago.setDate(sevendaysago.getDate() - 7);
  const todaytime = new Date();
  const thismonth = todaytime.getMonth() + 1;
  const monthago = todaytime.getMonth();
  const message_err = req.flash('message_err');

  // If tất cả không được dược chọn
  if (
    firstdate.length === 0 &&
    enddate.length === 0 &&
    loaihoadon === 'Loại hóa đơn' &&
    timeselect === 'Thời gian'
  ) {
    req.flash('message_err', 'Chưa chọn thời gian');
    res.redirect('back');
  }
  // If tất cả được dược chọn
  if (
    firstdate.length !== 0 &&
    enddate.length !== 0 &&
    loaihoadon !== 'Loại hóa đơn' &&
    timeselect !== 'Thời gian'
  ) {
    req.flash(
      'message_err',
      'Không được chọn khung thời gian cùng với khoảng ngày'
    );
    res.redirect('back');
  }

  // Search theo khoảng cách ngày và loại hóa đơn
  if (
    firstdate.length !== 0 &&
    enddate.length !== 0 &&
    loaihoadon !== 'Loại hóa đơn' &&
    timeselect === 'Thời gian'
  ) {
    DBHoaDon.findAll({
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
      where: {
        ngaytaohoadon: {
          [Op.gte]: firstdate,
          [Op.lt]: formatenddate,
        },
        loaihoadon: loaihoadon,
      },
    }).then((data) => {
      res.render('admin/pages/tables/hoadon', {
        listHD: data,
        message_err: message_err,
      });

      //testing
      // return res.status(200).json({
      //   message: 'Hiển thị lọc hóa đơn thành công',
      // });
    });
  }

  // Search theo khoảng cách ngày
  if (
    firstdate.length !== 0 &&
    enddate.length !== 0 &&
    loaihoadon === 'Loại hóa đơn' &&
    timeselect === 'Thời gian'
  ) {
    DBHoaDon.findAll({
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
      where: {
        ngaytaohoadon: {
          [Op.gte]: firstdate,
          [Op.lt]: formatenddate,
        },
      },
    })
      .then((data) => {
        res.render('admin/pages/tables/hoadon', {
          listHD: data,
          message_err: message_err,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving tutorials.',
        });
      });
  }

  // Search theo loại hóa đơn
  if (
    firstdate.length === 0 &&
    enddate.length === 0 &&
    loaihoadon !== 'Loại hóa đơn' &&
    timeselect === 'Thời gian'
  ) {
    DBHoaDon.findAll({
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
      where: {
        loaihoadon: loaihoadon,
      },
    })
      .then((data) => {
        res.render('admin/pages/tables/hoadon', {
          listHD: data,
          message_err: message_err,
        });
        // res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving tutorials.',
        });
      });
  }

  // Search theo Loại hóa đơn và khung thời gian
  if (
    firstdate.length === 0 &&
    enddate.length === 0 &&
    loaihoadon !== 'Loại hóa đơn' &&
    timeselect !== 'Thời gian'
  ) {
    if (timeselect === '1') {
      DBHoaDon.findAll({
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
        where: {
          loaihoadon: loaihoadon,
          ngaytaohoadon: {
            [Op.gte]: today,
            [Op.lt]: todayaddone,
          },
        },
      })
        .then((data) => {
          res.render('admin/pages/tables/hoadon', {
            listHD: data,
            message_err: message_err,
          });
          // res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving tutorials.',
          });
        });
    }
    if (timeselect === '2') {
      DBHoaDon.findAll({
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
        where: {
          loaihoadon: loaihoadon,
          ngaytaohoadon: {
            [Op.gte]: yesterday,
            [Op.lt]: today,
          },
        },
      })
        .then((data) => {
          res.render('admin/pages/tables/hoadon', {
            listHD: data,
            message_err: message_err,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving tutorials.',
          });
        });
    }
    if (timeselect === '3') {
      DBHoaDon.findAll({
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
        where: {
          loaihoadon: loaihoadon,
          ngaytaohoadon: {
            [Op.gte]: sevendaysago,
            [Op.lt]: today,
          },
        },
      })
        .then((data) => {
          res.render('admin/pages/tables/hoadon', {
            listHD: data,
            message_err: message_err,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving tutorials.',
          });
        });
    }
    if (timeselect === '4') {
      console.log(thismonth);
      const data = await sequelize.query(
        'SELECT `hoadon`.`idhoadon`, `hoadon`.`sohoadon`, `hoadon`.`ngaytaohoadon`, `hoadon`.`idnguoidung`, `hoadon`.`tinhtrang`,' +
          ' `hoadon`.`tongtien`, `hoadon`.`idkhachhang`, `hoadon`.`trahang`, `hoadon`.`diachigiaohang`, `hoadon`.`hinhthucthanhtoan`,' +
          ' `hoadon`.`trangthaihoadon`, `hoadon`.`congno`, `hoadon`.`hantracongno`, `hoadon`.`loaihoadon`, `hoadon`.`idnonkhachhang`, ' +
          ' `hoadon`.`tiengiaohang`, `hoadon`.`sodienthoai`, `hoadon`.`view`, `hoadon`.`idhinhthuc`, `hoadon`.`mahuydon`, ' +
          ' `khachhang`.`idkhachhang` AS `khachhang.idkhachhang`, `khachhang`.`tenkhachhang` AS `khachhang.tenkhachhang`, ' +
          ' `nguoidung`.`idnguoidung` AS `nguoidung.idnguoidung`, `nguoidung`.`tennguoidung` AS `nguoidung.tennguoidung`, ' +
          ' `nonkhachhang`.`idnonkhachhang` AS `nonkhachhang.idnonkhachhang`, `nonkhachhang`.`hovaten` AS `nonkhachhang.hovaten` ' +
          ' FROM `hoadon` AS `hoadon` ' +
          ' LEFT OUTER JOIN `khachhang` AS `khachhang` ON `hoadon`.`idkhachhang` = `khachhang`.`idkhachhang` ' +
          ' LEFT OUTER JOIN `nguoidung` AS `nguoidung` ON `hoadon`.`idnguoidung` = `nguoidung`.`idnguoidung` ' +
          ' LEFT OUTER JOIN `nonkhachhang` AS `nonkhachhang` ON `hoadon`.`idnonkhachhang` = `nonkhachhang`.`idnonkhachhang` ' +
          ' WHERE `hoadon`.`loaihoadon` = :loaihoadon' +
          ' AND MONTH(`hoadon`.`ngaytaohoadon`)= :thismonth',
        {
          replacements: { loaihoadon: loaihoadon, thismonth: thismonth },
          nest: true,
          raw: true,
        }
      );
      res.render('admin/pages/tables/hoadon', {
        listHD: data,
        message_err: message_err,
      });
    }
    if (timeselect === '5') {
      const data = await sequelize.query(
        'SELECT `hoadon`.`idhoadon`, `hoadon`.`sohoadon`, `hoadon`.`ngaytaohoadon`, `hoadon`.`idnguoidung`, `hoadon`.`tinhtrang`,' +
          ' `hoadon`.`tongtien`, `hoadon`.`idkhachhang`, `hoadon`.`trahang`, `hoadon`.`diachigiaohang`, `hoadon`.`hinhthucthanhtoan`,' +
          ' `hoadon`.`trangthaihoadon`, `hoadon`.`congno`, `hoadon`.`hantracongno`, `hoadon`.`loaihoadon`, `hoadon`.`idnonkhachhang`, ' +
          ' `hoadon`.`tiengiaohang`, `hoadon`.`sodienthoai`, `hoadon`.`view`, `hoadon`.`idhinhthuc`, `hoadon`.`mahuydon`, ' +
          ' `khachhang`.`idkhachhang` AS `khachhang.idkhachhang`, `khachhang`.`tenkhachhang` AS `khachhang.tenkhachhang`, ' +
          ' `nguoidung`.`idnguoidung` AS `nguoidung.idnguoidung`, `nguoidung`.`tennguoidung` AS `nguoidung.tennguoidung`, ' +
          ' `nonkhachhang`.`idnonkhachhang` AS `nonkhachhang.idnonkhachhang`, `nonkhachhang`.`hovaten` AS `nonkhachhang.hovaten` ' +
          ' FROM `hoadon` AS `hoadon` ' +
          ' LEFT OUTER JOIN `khachhang` AS `khachhang` ON `hoadon`.`idkhachhang` = `khachhang`.`idkhachhang` ' +
          ' LEFT OUTER JOIN `nguoidung` AS `nguoidung` ON `hoadon`.`idnguoidung` = `nguoidung`.`idnguoidung` ' +
          ' LEFT OUTER JOIN `nonkhachhang` AS `nonkhachhang` ON `hoadon`.`idnonkhachhang` = `nonkhachhang`.`idnonkhachhang` ' +
          ' WHERE `hoadon`.`loaihoadon` = :loaihoadon' +
          ' AND MONTH(`hoadon`.`ngaytaohoadon`)= :monthago',
        {
          replacements: { loaihoadon: loaihoadon, monthago: monthago },
          nest: true,
          raw: true,
        }
      );
      res.render('admin/pages/tables/hoadon', {
        listHD: data,
        message_err: message_err,
      });
    }
  }

  // Search theo khung thời gian
  if (
    firstdate.length === 0 &&
    enddate.length === 0 &&
    loaihoadon === 'Loại hóa đơn' &&
    timeselect !== 'Thời gian'
  ) {
    if (timeselect === '1') {
      DBHoaDon.findAll({
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
        where: {
          ngaytaohoadon: {
            [Op.gte]: today,
            [Op.lt]: todayaddone,
          },
        },
      })
        .then((data) => {
          res.render('admin/pages/tables/hoadon', {
            listHD: data,
            message_err: message_err,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving tutorials.',
          });
        });
    }
    if (timeselect === '2') {
      DBHoaDon.findAll({
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
        where: {
          ngaytaohoadon: {
            [Op.gte]: yesterday,
            [Op.lt]: today,
          },
        },
      })
        .then((data) => {
          res.render('admin/pages/tables/hoadon', {
            listHD: data,
            message_err: message_err,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving tutorials.',
          });
        });
    }
    if (timeselect === '3') {
      DBHoaDon.findAll({
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
        where: {
          ngaytaohoadon: {
            [Op.gte]: sevendaysago,
            [Op.lt]: today,
          },
        },
      })
        .then((data) => {
          res.render('admin/pages/tables/hoadon', {
            listHD: data,
            message_err: message_err,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving tutorials.',
          });
        });
    }
    if (timeselect === '4') {
      console.log(thismonth);
      const data = await sequelize.query(
        'SELECT `hoadon`.`idhoadon`, `hoadon`.`sohoadon`, `hoadon`.`ngaytaohoadon`, `hoadon`.`idnguoidung`, `hoadon`.`tinhtrang`,' +
          ' `hoadon`.`tongtien`, `hoadon`.`idkhachhang`, `hoadon`.`trahang`, `hoadon`.`diachigiaohang`, `hoadon`.`hinhthucthanhtoan`,' +
          ' `hoadon`.`trangthaihoadon`, `hoadon`.`congno`, `hoadon`.`hantracongno`, `hoadon`.`loaihoadon`, `hoadon`.`idnonkhachhang`, ' +
          ' `hoadon`.`tiengiaohang`, `hoadon`.`sodienthoai`, `hoadon`.`view`, `hoadon`.`idhinhthuc`, `hoadon`.`mahuydon`, ' +
          ' `khachhang`.`idkhachhang` AS `khachhang.idkhachhang`, `khachhang`.`tenkhachhang` AS `khachhang.tenkhachhang`, ' +
          ' `nguoidung`.`idnguoidung` AS `nguoidung.idnguoidung`, `nguoidung`.`tennguoidung` AS `nguoidung.tennguoidung`, ' +
          ' `nonkhachhang`.`idnonkhachhang` AS `nonkhachhang.idnonkhachhang`, `nonkhachhang`.`hovaten` AS `nonkhachhang.hovaten` ' +
          ' FROM `hoadon` AS `hoadon` ' +
          ' LEFT OUTER JOIN `khachhang` AS `khachhang` ON `hoadon`.`idkhachhang` = `khachhang`.`idkhachhang` ' +
          ' LEFT OUTER JOIN `nguoidung` AS `nguoidung` ON `hoadon`.`idnguoidung` = `nguoidung`.`idnguoidung` ' +
          ' LEFT OUTER JOIN `nonkhachhang` AS `nonkhachhang` ON `hoadon`.`idnonkhachhang` = `nonkhachhang`.`idnonkhachhang` ' +
          ' WHERE MONTH(`hoadon`.`ngaytaohoadon`)= :thismonth',
        {
          replacements: { thismonth: thismonth },
          nest: true,
          raw: true,
        }
      );
      res.render('admin/pages/tables/hoadon', {
        listHD: data,
        message_err: message_err,
      });
    }
    if (timeselect === '5') {
      const data = await sequelize.query(
        'SELECT `hoadon`.`idhoadon`, `hoadon`.`sohoadon`, `hoadon`.`ngaytaohoadon`, `hoadon`.`idnguoidung`, `hoadon`.`tinhtrang`,' +
          ' `hoadon`.`tongtien`, `hoadon`.`idkhachhang`, `hoadon`.`trahang`, `hoadon`.`diachigiaohang`, `hoadon`.`hinhthucthanhtoan`,' +
          ' `hoadon`.`trangthaihoadon`, `hoadon`.`congno`, `hoadon`.`hantracongno`, `hoadon`.`loaihoadon`, `hoadon`.`idnonkhachhang`, ' +
          ' `hoadon`.`tiengiaohang`, `hoadon`.`sodienthoai`, `hoadon`.`view`, `hoadon`.`idhinhthuc`, `hoadon`.`mahuydon`, ' +
          ' `khachhang`.`idkhachhang` AS `khachhang.idkhachhang`, `khachhang`.`tenkhachhang` AS `khachhang.tenkhachhang`, ' +
          ' `nguoidung`.`idnguoidung` AS `nguoidung.idnguoidung`, `nguoidung`.`tennguoidung` AS `nguoidung.tennguoidung`, ' +
          ' `nonkhachhang`.`idnonkhachhang` AS `nonkhachhang.idnonkhachhang`, `nonkhachhang`.`hovaten` AS `nonkhachhang.hovaten` ' +
          ' FROM `hoadon` AS `hoadon` ' +
          ' LEFT OUTER JOIN `khachhang` AS `khachhang` ON `hoadon`.`idkhachhang` = `khachhang`.`idkhachhang` ' +
          ' LEFT OUTER JOIN `nguoidung` AS `nguoidung` ON `hoadon`.`idnguoidung` = `nguoidung`.`idnguoidung` ' +
          ' LEFT OUTER JOIN `nonkhachhang` AS `nonkhachhang` ON `hoadon`.`idnonkhachhang` = `nonkhachhang`.`idnonkhachhang` ' +
          ' WHERE MONTH(`hoadon`.`ngaytaohoadon`)= :monthago',
        {
          replacements: { monthago: monthago },
          nest: true,
          raw: true,
        }
      );
      res.render('admin/pages/tables/hoadon', {
        listHD: data,
        message_err: message_err,
      });
    }
  }
};
