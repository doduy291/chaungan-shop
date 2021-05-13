const db = require('../server');
const DBsanpham = db.sanpham;
const DBhoadon = db.hoadon;
const DBchitiethoadon = db.chitiethoadon;
const DBkhachhang = db.khachhang;
const DBnonkhachhang = db.nonkhachhang;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const send = require('../controllers/sendMail.Controller');
const common = require('./common.Controller');

exports.getCart = async (req, res) => {
  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );

      if (req.khachhang) {
        res.render('pages/shopping-cart', {
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          emailkhachhang: infokhachhang.email,
          role: infokhachhang.role,
        });
      }
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }
  } else {
    if (req.sessionID) {
      try {
        const infoNonKH = await DBnonkhachhang.findOne({
          where: { sessionID: req.sessionID },
        });
        if (infoNonKH !== null) {
          const { listCart, totalPrice, countSP } = await common.cartNonKH(
            infoNonKH.idnonkhachhang
          );

          res.render('pages/shopping-cart', {
            listCart: listCart,
            totalPrice: totalPrice,
            countSP: countSP,
            emailkhachhang: null,
          });
        } else {
          res.render('pages/shopping-cart', {
            listCart: null,
            totalPrice: null,
            countSP: null,
            emailkhachhang: null,
          });
        }
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};

exports.checkOutBillDetail = async (req, res) => {
  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );
      
      let giasale = Number(0);
      if (infokhachhang) {
        if (infokhachhang.idloaikhachhang === 2) {
          giasale = Number(5);
        }
        if (infokhachhang.idloaikhachhang === 3) {
          giasale = Number(10);
        }
      }
      req.session.giasale = giasale;
      if (req.khachhang) {
        res.render('order/checkout', {
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          infoKH: infokhachhang,
          emailkhachhang: infokhachhang.email,
          role: infokhachhang.role,
          giasale: giasale,
        });
      }

      // res.send(temp);
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }
  } else {
    if (req.sessionID) {
      try {
        const infoNonKH = await DBnonkhachhang.findOne({
          where: { sessionID: req.sessionID },
        });
        const { listCart, totalPrice, countSP } = await common.cartNonKH(
          infoNonKH.idnonkhachhang
        );
        res.render('order/checkout', {
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          infoKH: null,
          emailkhachhang: null,
          giasale: 0
        });
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};

exports.checkoutSuccess = async (req, res) => {
  var sohoadon = req.session.HDnumber;

  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const hoadonShipping = await DBhoadon.findOne({
        where: {
          idkhachhang: req.khachhang.idkhachhang,
          sohoadon: sohoadon,
          trangthaihoadon: 1,
        },
        raw: true,
      });
      var listCart = null;
      var totalPrice = 0;
      var countSP = 0;

      if (req.khachhang) {
        res.render('order/order-success', {
          infoHD: hoadonShipping,
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          hovatenHD: infokhachhang.tenkhachhang,
          sdtHD: infokhachhang.sodienthoai,
          emailHD: infokhachhang.email,
          emailkhachhang: infokhachhang.email,
          role: infokhachhang.role,
        });
      }
      // req.session.HDnumber.destroy();
      // req.session.giasale.destroy();
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }
  } else {
    if (req.sessionID) {
      try {
        const infoNonKH = await DBnonkhachhang.findOne({
          where: { sessionID: req.sessionID },
        });
        const hoadonShipping = await DBhoadon.findOne({
          where: {
            idnonkhachhang: infoNonKH.idnonkhachhang,
            sohoadon: sohoadon,
            trangthaihoadon: 1,
          },
          raw: true,
        });

        var listCart = null;
        var totalPrice = 0;
        var countSP = 0;

        res.render('order/order-success', {
          infoHD: hoadonShipping,
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          hovatenHD: infoNonKH.hovaten,
          sdtHD: infoNonKH.sodienthoai,
          emailHD: infoNonKH.email,
          emailkhachhang: null,
        });
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};

exports.deleteOneCart = (req, res) => {
  const id = req.params.id;

  DBchitiethoadon.destroy({
    where: { idchitiethoadon: id },
  })
    .then((dataCTHD) => {
      res.redirect('/cart');

      //testing
      // return res.status(200).json({
      //   message: 'Xóa sản phẩm thành công',
      // });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete CTHD with id=' + id,
      });
    });
};

exports.timkiemhd = async (req, res, next) => {
  var reqHD = req.query.sohoadon;
  if (reqHD !== undefined) {
    const timkiemHD = await DBhoadon.findAll({
      where: {
        sohoadon: reqHD,
      },
      attributes: [
        'sohoadon',
        'ngaytaohoadon',
        'tinhtrang',
        'hinhthucthanhtoan',
        'trangthaihoadon',
      ],
      include: [
        {
          model: DBsanpham,
          as: 'sanphams',
          attributes: ['idsanpham', 'tensanpham', 'giabanle', 'anhsanpham'],
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
        {
          model: DBnonkhachhang,
          attributes: ['idnonkhachhang', 'email'],
        },
        {
          model: DBkhachhang,
          attributes: ['idkhachhang', 'email'],
        },
      ],
      group: ['sohoadon'],
      raw: true,
      nest: true,
    });
    if (timkiemHD.length <= 0) {
      req.maHD = undefined;
    } else {
      req.maHD = timkiemHD;
    }
  } else {
    req.maHD = undefined;
  }
  const message_success = req.flash('message_success');
  const message_err = req.flash('message_err');

  var listCart = [];
  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );

      if (req.khachhang) {
        res.render('search/search', {
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          emailkhachhang: infokhachhang.email,
          searchHD: req.maHD,
          message_success: message_success,
          message_err: message_err,
          role: infokhachhang.role,
        });

        //testing
        // if (req.maHD === undefined) {
        //   return res.status(200).json({
        //     message: 'Không có đơn hàng',
        //   });
        // } else {
        //   return res.status(200).json({
        //     message: 'Hiển thị đơn hàng thành công',
        //     searchHD: req.maHD,
        //   });
        // }
      }
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }
  } else {
    if (req.sessionID) {
      try {
        const infoNonKH = await DBnonkhachhang.findOne({
          where: { sessionID: req.sessionID },
        });
        if (infoNonKH !== null) {
          const { listCart, totalPrice, countSP } = await common.cartNonKH(
            infoNonKH.idnonkhachhang
          );

          res.render('search/search', {
            listCart: listCart,
            totalPrice: totalPrice,
            countSP: countSP,
            emailkhachhang: null,
            searchHD: req.maHD,
            message_success: message_success,
            message_err: message_err,
          });

          //testing
          // if (req.maHD === undefined) {
          //   return res.status(200).json({
          //     message: 'Không có đơn hàng',
          //   });
          // } else {
          //   return res.status(200).json({
          //     message: 'Hiển thị đơn hàng thành công',
          //     searchHD: req.maHD,
          //   });
          // }
        } else {
          res.render('search/search', {
            listCart: null,
            totalPrice: null,
            countSP: null,
            emailkhachhang: null,
            searchHD: req.maHD,
            message_success: message_success,
            message_err: message_err,
          });

          //testing
          // if (req.maHD === undefined) {
          //   return res.status(200).json({
          //     message: 'Không có đơn hàng',
          //   });
          // } else {
          //   return res.status(200).json({
          //     message: 'Hiển thị đơn hàng thành công',
          //     searchHD: req.maHD,
          //   });
          // }
        }
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};

exports.sendEmailCancelOrderCode = async (req, res) => {
  const hdkhdata = req.body.hdkhdata;
  const emailkh = hdkhdata.emailkh;
  const sohoadonkh = hdkhdata.sohoadonkh;
  var randomcode = new Array(7).join().replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0)
      .toString(36)
      [Math.random() < 0.5 ? 'toString' : 'toUpperCase']();
  });
  await DBhoadon.update(
    {
      mahuydon: randomcode,
    },
    {
      where: {
        sohoadon: sohoadonkh,
      },
    }
  );
  await send.sendEmailCancelOrder({
    mahuydon: randomcode,
    sohoadonkh: sohoadonkh,
    emailkh: emailkh,
  });
};

exports.confirmCancelOrder = async (req, res, next) => {
  const mahuyhang = req.body.mahuyhang;
  const sohoadonhuyhang = req.body.sohoadonhuyhang;
  const confirmHoadon = await DBhoadon.findOne({
    where: {
      sohoadon: sohoadonhuyhang,
      mahuydon: mahuyhang,
    },
    raw: true,
    nest: true,
  });
  if (confirmHoadon !== null) {
    await DBhoadon.update(
      {
        trangthaihoadon: 6,
      },
      {
        where: { sohoadon: sohoadonhuyhang },
      }
    );
    req.flash('message_success', 'Đã hủy đơn hàng');
    res.redirect('/cart/tim-kiem-hd?sohoadon=' + sohoadonhuyhang);
  } else {
    req.flash('message_err', 'Nhập sai mã');
    res.redirect('/cart/tim-kiem-hd?sohoadon=' + sohoadonhuyhang);
  }
};
