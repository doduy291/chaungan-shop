//Khai báo Model Sequelize
const db = require('../server');
const DBsanpham = db.sanpham;
const DBmausanpham = db.mausanpham;
const DBsizesanpham = db.sizesanpham;
const DBhoadon = db.hoadon;
const DBchitiethoadon = db.chitiethoadon;
const DBkhachhang = db.khachhang;
const DBnonkhachhang = db.nonkhachhang;
const DBkho = db.kho;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const send = require('../controllers/sendMail.Controller');

// Order
// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  // Mã hóa đơn (HDyyyymmddhhmmss)
  var today = new Date();
  function checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }
  var formatDate = today.toISOString().split('T')[0];
  var yyyymmdd =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, '0') +
    String(today.getDate()).padStart(2, '0');
  var hhmmss =
    today.getHours() +
    '' +
    checkTime(today.getMinutes()) +
    '' +
    checkTime(today.getSeconds());
  var sohoadon = 'HD' + yyyymmdd + hhmmss;

  // Lấy value thông tin sản phẩm qua Ajax
  const spdata = req.body.spdata;
  const tensanpham = spdata.tensanpham;
  const soluong = spdata.soluong;
  const mausanpham = spdata.colorsp;
  const sizesanpham = spdata.sizesp;

  let chitiethoadonCart = [];

  // Nếu req.khachhang không bị không xác định được
  if (req.khachhang !== undefined) {
    try {
      // Lấy thông tin sản phẩm
      const infoSP = await DBsanpham.findOne({
        where: { tensanpham: tensanpham },
        include: [
          {
            model: DBmausanpham,
            attributes: ['idmausanpham', 'tenmausanpham'],
            where: { tenmausanpham: mausanpham },
          },
          {
            model: DBsizesanpham,
            attributes: ['idsize', 'tensize'],
            where: { tensize: sizesanpham },
          },
        ],
        raw: true,
        nest: true,
      });

      // Tìm nơi chứa hóa đơn chưa thanh toán
      const hoadonNotPay = await DBhoadon.findOne({
        where: {
          idkhachhang: req.khachhang.idkhachhang,
          tinhtrang: 0,
          trangthaihoadon: null,
        },
      });
      // Nếu không có nơi chứa hóa đơn thì tạo nơi chứa hóa đơn mới
      if (hoadonNotPay === null) {
        let newHoadon = await DBhoadon.build({
          sohoadon: sohoadon,
          ngaytaohoadon: formatDate,
          idnguoidung: 2,
          tinhtrang: 0,
          tongtien: '0',
          idkhachhang: req.khachhang.idkhachhang,
          trahang: 0,
          congno: 0,
          loaihoadon: 1,
          hantracongno: '1000-01-01',
        }).save();

        let newChitiethoadon = await DBchitiethoadon.build({
          idhoadon: newHoadon.idhoadon,
          idsanpham: infoSP.idsanpham,
          soluong: soluong,
          thanhtien: infoSP.giabanle * soluong,
          uudai: 0,
          ghichu: 'Mới',
        }).save();
        await chitiethoadonCart.push(newChitiethoadon);

        // Ngược lại thì tìm nơi chứa hóa đơn đã có và cập nhật sản phẩm mới được thêm
      } else {
        const oldChitiethoadon = await DBchitiethoadon.findOne({
          where: {
            idhoadon: hoadonNotPay.idhoadon,
            idsanpham: infoSP.idsanpham,
          },
        });

        if (oldChitiethoadon === null) {
          await DBchitiethoadon.build({
            idhoadon: hoadonNotPay.idhoadon,
            idsanpham: infoSP.idsanpham,
            soluong: soluong,
            thanhtien: infoSP.giabanle * soluong,
            uudai: 0,
            ghichu: 'Mới',
          }).save();
        } else {
          await DBchitiethoadon.update(
            {
              soluong: parseInt(oldChitiethoadon.soluong) + parseInt(soluong),
              thanhtien:
                parseInt(oldChitiethoadon.thanhtien) +
                parseInt(soluong) * parseInt(infoSP.giabanle),
            },
            {
              where: {
                idhoadon: oldChitiethoadon.idhoadon,
                idsanpham: oldChitiethoadon.idsanpham,
              },
            }
          );
        }
      }

      // Response result và url vào ajax để chuyển đến giỏ hàng
      return await res.status(200).send({
        result: 'redirect',
        url: '/cart',
      });

      //testing
      // return res.status(200).json({
      //   message: 'Thêm sản phẩm thành công',
      //   result: 'redirect',
      //   url: '/cart',
      // });
    } catch (err) {
      console.log('Http error', err);
      return res.status(500).send();
    }

    // Nếu req.khachhang không được xác định (dành cho khách hàng không dùng tài khoản)
  } else {
    // Nếu có sessionID
    if (req.sessionID) {
      try {
        // Tìm kiếm khách hàng có cùng sessionID
        const getNonKH = await DBnonkhachhang.findOne({
          where: { sessionID: req.sessionID },
        });
        // Lấy thông tin sản phẩm
        const infoSP = await DBsanpham.findOne({
          where: { tensanpham: tensanpham },
          include: [
            {
              model: DBmausanpham,
              attributes: ['idmausanpham', 'tenmausanpham'],
              where: { tenmausanpham: mausanpham },
            },
            {
              model: DBsizesanpham,
              attributes: ['idsize', 'tensize'],
              where: { tensize: sizesanpham },
            },
          ],
          raw: true,
          nest: true,
        });
        // Nếu thông tin khách hàng trùng sessionID không có thì tạo nơi lưu khách hàng không đăng nhập mới
        if (getNonKH === null) {
          let buildNonKH = await DBnonkhachhang.build({
            sessionID: req.sessionID,
          }).save();
          // Tìm nơi chứa hóa đơn chưa thanh toán
          const hoadonNotPay = await DBhoadon.findOne({
            where: {
              idnonkhachhang: buildNonKH.idnonkhachhang,
              tinhtrang: 0,
              trangthaihoadon: null,
            },
          });

          // Nếu không có nơi chứa hóa đơn thì tạo nơi chứa hóa đơn mới
          if (hoadonNotPay === null) {
            let newHoadon = await DBhoadon.build({
              sohoadon: sohoadon,
              ngaytaohoadon: formatDate,
              idnguoidung: 2,
              tinhtrang: 0,
              tongtien: '0',
              idnonkhachhang: buildNonKH.idnonkhachhang,
              trahang: 0,
              congno: 0,
              loaihoadon: 1,
              hantracongno: '1000-01-01',
            }).save();

            let newChitiethoadon = await DBchitiethoadon.build({
              idhoadon: newHoadon.idhoadon,
              idsanpham: infoSP.idsanpham,
              soluong: soluong,
              thanhtien: infoSP.giabanle * soluong,
              uudai: 0,
              ghichu: 'Mới',
            }).save();
            await chitiethoadonCart.push(newChitiethoadon);

            // Ngược lại thì tìm nơi chứa hóa đơn đã có và cập nhật sản phẩm mới được thêm
          } else {
            const oldChitiethoadon = await DBchitiethoadon.findOne({
              where: {
                idhoadon: hoadonNotPay.idhoadon,
                idsanpham: infoSP.idsanpham,
              },
            });

            if (oldChitiethoadon === null) {
              await DBchitiethoadon.build({
                idhoadon: hoadonNotPay.idhoadon,
                idsanpham: infoSP.idsanpham,
                soluong: soluong,
                thanhtien: infoSP.giabanle * soluong,
                uudai: 0,
                ghichu: 'Mới',
              }).save();
            } else {
              await DBchitiethoadon.update(
                {
                  soluong:
                    parseInt(oldChitiethoadon.soluong) + parseInt(soluong),
                  thanhtien:
                    parseInt(oldChitiethoadon.thanhtien) +
                    parseInt(soluong) * parseInt(infoSP.giabanle),
                },
                {
                  where: {
                    idhoadon: oldChitiethoadon.idhoadon,
                    idsanpham: oldChitiethoadon.idsanpham,
                  },
                }
              );
            }
          }

          // Response result và url vào ajax để chuyển đến giỏ hàng
          return await res.status(200).send({
            result: 'redirect',
            url: '/cart',
          });

          //testing
          // return res.status(200).json({
          //   message: 'Thêm sản phẩm thành công',
          //   result: 'redirect',
          //   url: '/cart',
          // });

          // Nếu khách hàng trùng sessionID tồn tại
        } else {
          // Tìm nơi chứa hóa đơn chưa thanh toán
          const hoadonNotPay = await DBhoadon.findOne({
            where: {
              idnonkhachhang: getNonKH.idnonkhachhang,
              tinhtrang: 0,
              trangthaihoadon: null,
            },
          });

          // Nếu không có nơi chứa hóa đơn thì tạo nơi chứa hóa đơn mới
          if (hoadonNotPay === null) {
            let newHoadon = await DBhoadon.build({
              sohoadon: sohoadon,
              ngaytaohoadon: formatDate,
              idnguoidung: 2,
              tinhtrang: 0,
              tongtien: '0',
              idnonkhachhang: getNonKH.idnonkhachhang,
              trahang: 0,
              congno: 0,
              hantracongno: '1000-01-01',
            }).save();

            let newChitiethoadon = await DBchitiethoadon.build({
              idhoadon: newHoadon.idhoadon,
              idsanpham: infoSP.idsanpham,
              soluong: soluong,
              thanhtien: infoSP.giabanle * soluong,
              uudai: 0,
              ghichu: 'Mới',
            }).save();
            await chitiethoadonCart.push(newChitiethoadon);

            // Ngược lại thì tìm nơi chứa hóa đơn đã có và cập nhật sản phẩm mới được thêm
          } else {
            const oldChitiethoadon = await DBchitiethoadon.findOne({
              where: {
                idhoadon: hoadonNotPay.idhoadon,
                idsanpham: infoSP.idsanpham,
              },
            });

            if (oldChitiethoadon === null) {
              await DBchitiethoadon.build({
                idhoadon: hoadonNotPay.idhoadon,
                idsanpham: infoSP.idsanpham,
                soluong: soluong,
                thanhtien: infoSP.giabanle * soluong,
                uudai: 0,
                ghichu: 'Mới',
              }).save();
            } else {
              await DBchitiethoadon.update(
                {
                  soluong:
                    parseInt(oldChitiethoadon.soluong) + parseInt(soluong),
                  thanhtien:
                    parseInt(oldChitiethoadon.thanhtien) +
                    parseInt(soluong) * parseInt(infoSP.giabanle),
                },
                {
                  where: {
                    idhoadon: oldChitiethoadon.idhoadon,
                    idsanpham: oldChitiethoadon.idsanpham,
                  },
                }
              );
            }
          }
          // Response result và url vào ajax để chuyển đến giỏ hàng
          return await res
            .status(200)
            .send({ result: 'redirect', url: '/cart' });

          //testing
          // return res.status(200).json({
          //   message: 'Thêm sản phẩm thành công',
          //   result: 'redirect',
          //   url: '/cart',
          // });
        }
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};

exports.placeOrder = async (req, res, next) => {
  const paymethod = req.body.rbpay;
  const hovaten = req.body.hovaten;
  const tinhthanh = req.body.tinhthanh;
  const quanhuyen = req.body.quanhuyen;
  const diachi = req.body.diachi;
  const email = req.body.email;
  const phone = req.body.phone;
  const giasale = req.session.giasale;
console.log(giasale)
  // Update lại lấy ngày tạo hóa đơn
  var today = new Date();
  var ngaytaohoadon = today.toString();
  var ddmmyyyy =
    String(today.getDate()).padStart(2, '0') +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    today.getFullYear();

  if (req.khachhang !== undefined) {
    const hoadonNotPay = await DBhoadon.findOne({
      where: {
        idkhachhang: req.khachhang.idkhachhang,
        tinhtrang: 0,
        trangthaihoadon: null,
      },
    });
    req.session.HDnumber = hoadonNotPay.sohoadon;
    // Get Subtotal hoadon
    const getSubtotal = await DBchitiethoadon.findOne({
      where: { idhoadon: hoadonNotPay.idhoadon },
      attributes: [
        'idhoadon',
        [Sequelize.fn('sum', Sequelize.col('thanhtien')), 'subtotal'],
      ],
      group: ['idhoadon'],
      raw: true,
    });
    const getChitiethoadon = await DBchitiethoadon.findAll({
      where: { idhoadon: hoadonNotPay.idhoadon },
      include: {
        model: DBsanpham,
        as: 'sanpham',
        attributes: ['idsanpham', 'tensanpham', 'giabanle', 'anhsanpham'],
      },
      raw: true,
      nest: true,
    });

    // Nếu khách hàng sử dụng tài khoản đăng nhập
    if (req.khachhang) {
      const emailkhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      // Cập nhật thông tin khách hàng
      await DBkhachhang.update(
        {
          tenkhachhang: hovaten,
          sodienthoai: phone,
          diachi: diachi + ', ' + quanhuyen + ', ' + tinhthanh,
        },
        { where: { email: emailkhachhang.email } }
      );
    }
    // Nếu phương pháp thanh toán = 0 (Thanh toán COD), = 1 (Thanh toán tại cửa hàng)
    if (paymethod === '0' || '1') {
      // Cập nhật trừ số lượng sản phẩm và hàng tồn kho
      getChitiethoadon.forEach(async (CTHD) => {
        const getSanphamID = await DBsanpham.findOne({
          where: { idsanpham: CTHD.idsanpham },
        });
        const getKhoSanphamID = await DBkho.findOne({
          where: { idsanpham: CTHD.idsanpham },
        });
        await DBsanpham.update(
          { tonkho: parseInt(getSanphamID.tonkho - CTHD.soluong) },
          { where: { idsanpham: getSanphamID.idsanpham } }
        );
        await DBkho.update(
          { tonkho: parseInt(getKhoSanphamID.tonkho - CTHD.soluong) },
          { where: { idsanpham: getKhoSanphamID.idsanpham } }
        );
      });
      // Cập nhật lại thông tin hóa đơn sau khi đặt
      await DBhoadon.update(
        {
          diachigiaohang: diachi + ', ' + quanhuyen + ', ' + tinhthanh,
          hinhthucthanhtoan: paymethod,
          trangthaihoadon: 1,
          tongtien:
            (parseInt(getSubtotal.subtotal)) *
            ((Number(100) - giasale) / Number(100)),
          ngaytaohoadon: ngaytaohoadon,
          loaihoadon: 1,
          sodienthoai: phone,
          trahang: 1,
          view: 0,
          idhinhthuc: 1,
        },
        { where: { idhoadon: hoadonNotPay.idhoadon } }
      );
      // Thông tin gửi Email thông tin chi tiết về đơn hàng
      const infoBillEmail = {
        hovatenclient: hovaten,
        phoneclient: phone,
        diachigiaohangclient: diachi + ', ' + quanhuyen + ', ' + tinhthanh,
        sohoadonclient: hoadonNotPay.sohoadon,
        ngaydathang: ddmmyyyy,
        chitiethoadonclient: getChitiethoadon,
        totalPrice: getSubtotal.subtotal,
      };
      await send.sendEmail({
        emailclient: req.body.email,
        client: infoBillEmail,
      });
    }
    // Trả về trang thông báo đặt hàng thành công
    res.redirect('/cart/checkout/success');

    // Ngược lại nếu khách hàng không đăng nhập
  } else {
    if (req.sessionID) {
      const getInfoNonKH = await DBnonkhachhang.findOne({
        where: { sessionID: req.sessionID },
      });
      const hoadonNotPay = await DBhoadon.findOne({
        where: {
          idnonkhachhang: getInfoNonKH.idnonkhachhang,
          tinhtrang: 0,
          trangthaihoadon: null,
        },
      });
      req.session.HDnumber = hoadonNotPay.sohoadon;

      // Lấy tổng phụ đơn hàng
      const getSubtotal = await DBchitiethoadon.findOne({
        where: { idhoadon: hoadonNotPay.idhoadon },
        attributes: [
          'idhoadon',
          [Sequelize.fn('sum', Sequelize.col('thanhtien')), 'subtotal'],
        ],
        group: ['idhoadon'],
        raw: true,
      });
      const getChitiethoadon = await DBchitiethoadon.findAll({
        where: { idhoadon: hoadonNotPay.idhoadon },
        include: {
          model: DBsanpham,
          as: 'sanpham',
          attributes: ['idsanpham', 'tensanpham', 'giabanle', 'anhsanpham'],
        },
        raw: true,
        nest: true,
      });

      // Nếu khách hàng không sử dụng tài khoản
      // Nếu phương pháp thanh toán = 0 (Thanh toán COD), = 1 (Thanh toán tại cửa hàng)
      if (paymethod === '0' || '1') {
        // Cập nhật trừ số lượng sản phẩm và hàng tồn kho
        getChitiethoadon.forEach(async (CTHD) => {
          const getSanphamID = await DBsanpham.findOne({
            where: { idsanpham: CTHD.idsanpham },
          });
          const getKhoSanphamID = await DBkho.findOne({
            where: { idsanpham: CTHD.idsanpham },
          });
          await DBsanpham.update(
            { tonkho: parseInt(getSanphamID.tonkho - CTHD.soluong) },
            { where: { idsanpham: getSanphamID.idsanpham } }
          );
          await DBkho.update(
            { tonkho: parseInt(getKhoSanphamID.tonkho - CTHD.soluong) },
            { where: { idsanpham: getKhoSanphamID.idsanpham } }
          );
        });
        //Cập nhật thông tin khách hàng không đăng nhập
        await DBnonkhachhang.update(
          { hovaten: hovaten, email: email, sodienthoai: phone },
          { where: { sessionID: req.sessionID } }
        );
        // Cập nhật lại thông tin hóa đơn sau khi đặt
        await DBhoadon.update(
          {
            diachigiaohang: diachi + ', ' + quanhuyen + ', ' + tinhthanh,
            hinhthucthanhtoan: paymethod,
            trangthaihoadon: 1,
            tongtien: parseInt(getSubtotal.subtotal),
            ngaytaohoadon: ngaytaohoadon,
            loaihoadon: 1,
            sodienthoai: phone,
            trahang: 1,
            view: 0,
            idhinhthuc: 1,
          },
          { where: { idhoadon: hoadonNotPay.idhoadon } }
        );
        // Thông tin gửi Email thông tin chi tiết về đơn hàng
        const infoBillEmail = {
          hovatenclient: hovaten,
          phoneclient: phone,
          diachigiaohangclient: diachi + ', ' + quanhuyen + ', ' + tinhthanh,
          sohoadonclient: hoadonNotPay.sohoadon,
          ngaydathang: ddmmyyyy,
          chitiethoadonclient: getChitiethoadon,
          totalPrice: getSubtotal.subtotal,
        };
        await send.sendEmail({
          emailclient: req.body.email,
          client: infoBillEmail,
        });
      }
      // Trả về trang thông báo đặt hàng thành công
      res.redirect('/cart/checkout/success');
    }
  }
};
