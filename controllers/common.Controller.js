const db = require('../server');
const DBsanpham = db.sanpham;
const DBhoadon = db.hoadon;
const DBchitiethoadon = db.chitiethoadon;
const DBkhachhang = db.khachhang;
const DBnonkhachhang = db.nonkhachhang;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

const cartKH = async (reqkh) => {
  var listCart = [];
  const cart = await DBhoadon.findOne({
    where: {
      idkhachhang: reqkh,
      tinhtrang: 0,
      trangthaihoadon: null,
    },
    attributes: ['idhoadon'],
    include: {
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
  });

  if (cart !== null) {
    // Push cart to empty array
    var x = JSON.stringify(cart);
    listCart.push(JSON.parse(x));

    // Get TongTien hoadon
    const totalPriceCart = await DBchitiethoadon.findOne({
      where: { idhoadon: cart.idhoadon },
      attributes: [
        'idhoadon',
        [Sequelize.fn('sum', Sequelize.col('thanhtien')), 'subtotal'],
      ],
      group: ['idhoadon'],
      raw: true,
    });
    // Count Sanpham Cart
    const countSPCart = await DBchitiethoadon.findAndCountAll({
      where: { idhoadon: cart.idhoadon },
    });
    if (totalPriceCart !== null && countSPCart !== null) {
      var totalPrice = totalPriceCart.subtotal;
      var countSP = countSPCart.count;
    } else {
      var totalPrice = 0;
      var countSP = 0;
    }
  } else {
    var listCart = null;
    var totalPrice = 0;
    var countSP = 0;
  }
  return { listCart, totalPrice, countSP };
};

const cartNonKH = async (infoIDNonKH) => {
  var listCart = [];
  console.log(infoIDNonKH);
  const cart = await DBhoadon.findOne({
    where: {
      idnonkhachhang: infoIDNonKH,
      tinhtrang: 0,
      trangthaihoadon: null,
    },
    attributes: ['idhoadon'],
    include: {
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
  });

  if (cart !== null) {
    // Push cart to empty array
    var x = JSON.stringify(cart);
    listCart.push(JSON.parse(x));

    // Get TongTien hoadon
    const totalPriceCart = await DBchitiethoadon.findOne({
      where: { idhoadon: cart.idhoadon },
      attributes: [
        'idhoadon',
        [Sequelize.fn('sum', Sequelize.col('thanhtien')), 'subtotal'],
      ],
      group: ['idhoadon'],
      raw: true,
    });
    // Count Sanpham Cart
    const countSPCart = await DBchitiethoadon.findAndCountAll({
      where: { idhoadon: cart.idhoadon },
    });
    if (totalPriceCart !== null && countSPCart !== null) {
      var totalPrice = totalPriceCart.subtotal;
      var countSP = countSPCart.count;
    } else {
      var totalPrice = 0;
      var countSP = 0;
    }
  } else {
    var listCart = null;
    var totalPrice = 0;
    var countSP = 0;
  }

  return { listCart, totalPrice, countSP };
};
module.exports = { cartKH, cartNonKH };
