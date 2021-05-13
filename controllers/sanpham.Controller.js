const db = require('../server');
const DBkhachhang = db.khachhang;
const DBnonkhachhang = db.nonkhachhang;
const DBsanpham = db.sanpham;
const DBloaisanpham = db.loaisanpham;
const DBmausanpham = db.mausanpham;
const DBsizesanpham = db.sizesanpham;
const DBhangsanpham = db.hangsanpham;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const Buffer = require('buffer/').Buffer;
const common = require('./common.Controller');

// Pagination Sub-function
const getPagination = (page) => {
  const limit = 12;
  const offset = limit * page - limit;
  return { limit, offset };
};
const getPagingData = (dataCount, page, limit) => {
  const totalItems = dataCount.count.length;
  const sanpham = dataCount.rows;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, sanpham, totalPages, currentPage };
};

// Pagination req.params
exports.pagination = async (req, res) => {
  const condition = {};
  const order = [];
  let page;
  if (req.query.timkiemsp) {
    const ifmultiplesp = req.query.timkiemsp.split(' ');
    const arrayobj = ifmultiplesp.map((obj) => {
      let objecttensp;
      objecttensp = { [Op.like]: `%${obj}%` };
      return objecttensp;
    });
    condition.tensanpham = { [Op.or]: arrayobj };
    
  }
  if (req.query.ld) {
    condition.thuoctinhkhachhang = req.query.ld;
  }
  if (req.query.lsp) {
    condition.idloaisanpham = req.query.lsp;
  }
  if (req.query.hang) {
    condition.idhangsanpham = req.query.hang;
    
  }
  if (req.query.orderPrice) {
    order.push(['giabanle', req.query.orderPrice]);
  }
  if (req.query.orderNewest) {
    order.push(['idsanpham', 'DESC']);
  }
  console.log(condition)
  //Current Page
  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  }
  if (Number(page) <= 0) {
    res.redirect('/product');
  }

  const listhangsp = await DBhangsanpham.findAll({
    attributes: ['idhangsanpham', 'tenhang'],
    raw: true,
    nest: true,
  });
  const { limit, offset } = getPagination(page);
  const dataCount = await DBsanpham.findAndCountAll({
    attributes: [
      'idsanpham',
      'tensanpham',
      'anhsanpham',
      'giabanle',
      'idloaisanpham',
      'thuoctinhkhachhang',
      'idhangsanpham'
    ],
    where: condition,
    limit,
    offset,
    order: order,
    group: ['tensanpham'],
  });
  const dataSP = getPagingData(dataCount, page, limit);
  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );
      if (req.khachhang) {
        res.render('pages/product', {
          listSP: dataSP.sanpham,
          currentPage: dataSP.currentPage,
          totalPages: dataSP.totalPages,
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          listhangsp: listhangsp,
          emailkhachhang: infokhachhang.email,
          role: infokhachhang.role,
          timkiemsp: req.query.timkiemsp,
          loaido: req.query.ld,
          loaisanpham: req.query.lsp,
          hang: req.query.hang,
          orderPrice: req.query.orderPrice,
          orderNewest: req.query.orderNewest,
          page: req.query.page,
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
          res.render('pages/product', {
            listSP: dataSP.sanpham,
            currentPage: dataSP.currentPage,
            totalPages: dataSP.totalPages,
            listCart: listCart,
            listhangsp: listhangsp,
            totalPrice: totalPrice,
            countSP: countSP,
            emailkhachhang: null,
            timkiemsp: req.query.timkiemsp,
            loaido: req.query.ld,
            loaisanpham: req.query.lsp,
            hang: req.query.hang,
            orderPrice: req.query.orderPrice,
            orderNewest: req.query.orderNewest,
            page: req.query.page,
          });
        } else {
          res.render('pages/product', {
            listSP: dataSP.sanpham,
            currentPage: dataSP.currentPage,
            totalPages: dataSP.totalPages,
            listCart: null,
            totalPrice: null,
            countSP: null,
            listhangsp: listhangsp,
            emailkhachhang: null,
            timkiemsp: req.query.timkiemsp,
            loaido: req.query.ld,
            loaisanpham: req.query.lsp,
            hang: req.query.hang,
            orderPrice: req.query.orderPrice,
            orderNewest: req.query.orderNewest,
            page: req.query.page,
          });
        }
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};

// Tim tat ca sanpham
exports.findAllSP = async (req, res) => {
  var listCart = [];
  const page = 1;
  const listhangsp = await DBhangsanpham.findAll({
    attributes: ['idhangsanpham', 'tenhang'],
    raw: true,
    nest: true,
  });
  const { limit, offset } = getPagination(page);
  const dataCount = await DBsanpham.findAndCountAll({
    attributes: [
      'idsanpham',
      'tensanpham',
      'anhsanpham',
      'giabanle',
      'idloaisanpham',
      'thuoctinhkhachhang',
    ],
    limit,
    offset,
    order: [['idsanpham', 'DESC']],
    group: ['tensanpham'],
  });
  const dataSP = getPagingData(dataCount, page, limit);
  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );
      if (req.khachhang) {
        res.render('pages/product', {
          listSP: dataSP.sanpham,
          currentPage: dataSP.currentPage,
          totalPages: dataSP.totalPages,
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          listhangsp: listhangsp,
          emailkhachhang: infokhachhang.email,
          role: infokhachhang.role,
          timkiemsp: req.query.timkiemsp,
          loaido: req.query.ld,
          loaisanpham: req.query.lsp,
          hang: req.query.hang,
          orderPrice: req.query.orderPrice,
          orderNewest: req.query.orderNewest,
          page: req.query.page,
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
          res.render('pages/product', {
            listSP: dataSP.sanpham,
            currentPage: dataSP.currentPage,
            totalPages: dataSP.totalPages,
            listCart: listCart,
            totalPrice: totalPrice,
            countSP: countSP,
            listhangsp: listhangsp,
            emailkhachhang: null,
            timkiemsp: req.query.timkiemsp,
            loaido: req.query.ld,
            loaisanpham: req.query.lsp,
            hang: req.query.hang,
            orderPrice: req.query.orderPrice,
            orderNewest: req.query.orderNewest,
            page: req.query.page,
          });
        } else {
          res.render('pages/product', {
            listSP: dataSP.sanpham,
            currentPage: dataSP.currentPage,
            totalPages: dataSP.totalPages,
            listCart: null,
            totalPrice: null,
            countSP: null,
            listhangsp: listhangsp,
            emailkhachhang: null,
            timkiemsp: req.query.timkiemsp,
            loaido: req.query.ld,
            loaisanpham: req.query.lsp,
            hang: req.query.hang,
            orderPrice: req.query.orderPrice,
            orderNewest: req.query.orderNewest,
            page: req.query.page,
          });
        }
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};

// Tim mot sanpham bang ID
exports.findDetailSP = async (req, res) => {
  const tensanpham = req.params.tensanpham;

  const dataProductDetail = await DBsanpham.findAll({
    where: { tensanpham: tensanpham },
    raw: true,
    nest: true,
  });
  const dataProductDetailColor = await DBsanpham.findAll({
    where: { tensanpham: tensanpham },
    attributes: ['tensanpham', 'idmausanpham'],
    include: {
      model: DBmausanpham,
      attributes: ['tenmausanpham'],
    },
    group: ['idmausanpham'],
  });
  const dataProductDetailSize = await DBsanpham.findAll({
    where: { tensanpham: tensanpham },
    attributes: ['tensanpham', 'idsizesanpham'],
    include: {
      model: DBsizesanpham,
      attributes: ['tensize'],
    },
    group: ['idsizesanpham'],
  });
  const dataProductDetailMaSP = await DBsanpham.findAll({
    where: { tensanpham: tensanpham },
    attributes: ['tensanpham', 'masanpham'],
    group: ['masanpham'],
  });
  const dataProductDetailLoaiSP = await DBsanpham.findAll({
    where: { tensanpham: tensanpham },
    attributes: ['tensanpham', 'idloaisanpham'],
    include: {
      model: DBloaisanpham,
      attributes: ['tenloaisanpham'],
    },
    group: ['idloaisanpham'],
  });
  if (req.khachhang !== undefined) {
    try {
      const infokhachhang = await DBkhachhang.findOne({
        where: { idkhachhang: req.khachhang.idkhachhang },
      });
      const { listCart, totalPrice, countSP } = await common.cartKH(
        req.khachhang.idkhachhang
      );
      if (req.khachhang) {
        res.render('pages/product-detail', {
          productDetail: dataProductDetail,
          colorprdDetail: dataProductDetailColor,
          sizeprdDetail: dataProductDetailSize,
          maspprdDetail: dataProductDetailMaSP,
          loaispprdDetail: dataProductDetailLoaiSP,
          listCart: listCart,
          totalPrice: totalPrice,
          countSP: countSP,
          emailkhachhang: infokhachhang.email,
          role: infokhachhang.role,
        });

        //testing
        // return res.status(200).json({
        //   message: 'Hiển thị trang chi tiết sản phẩm thành công',
        //   dataProductDetail: dataProductDetail,
        //   dataProductDetailColor: dataProductDetailColor,
        //   dataProductDetailSize: dataProductDetailSize,
        // });
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
          res.render('pages/product-detail', {
            productDetail: dataProductDetail,
            colorprdDetail: dataProductDetailColor,
            sizeprdDetail: dataProductDetailSize,
            maspprdDetail: dataProductDetailMaSP,
            loaispprdDetail: dataProductDetailLoaiSP,
            listCart: listCart,
            totalPrice: totalPrice,
            countSP: countSP,
            emailkhachhang: null,
          });

          //testing
          // return res.status(200).json({
          //   message: 'Hiển thị trang chi tiết sản phẩm thành công',
          //   dataProductDetail: dataProductDetail,
          //   dataProductDetailColor: dataProductDetailColor,
          //   dataProductDetailSize: dataProductDetailSize,
          // });
        } else {
          res.render('pages/product-detail', {
            productDetail: dataProductDetail,
            colorprdDetail: dataProductDetailColor,
            sizeprdDetail: dataProductDetailSize,
            maspprdDetail: dataProductDetailMaSP,
            loaispprdDetail: dataProductDetailLoaiSP,
            listCart: null,
            totalPrice: null,
            countSP: null,
            emailkhachhang: null,
          });

          //testing
          // return res.status(200).json({
          //   message: 'Hiển thị trang chi tiết sản phẩm thành công',
          //   dataProductDetail: dataProductDetail,
          //   dataProductDetailColor: dataProductDetailColor,
          //   dataProductDetailSize: dataProductDetailSize,
          // });
        }
      } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
      }
    }
  }
};

exports.getPriceColorSize = async (req, res) => {
  const pricecondition = req.body.pricecondition;
  const tensanpham = pricecondition.tensanpham;
  const mausanpham = pricecondition.colorsp;
  const sizesanpham = pricecondition.sizesp;

  if ((mausanpham && sizesanpham !== undefined) || '') {
    const getPriceAndImage = await DBsanpham.findOne({
      where: {
        tensanpham: tensanpham,
      },
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
    if (getPriceAndImage !== null) {
      let imageBuffer = getPriceAndImage.anhsanpham;
      imageBuffer = new Buffer(imageBuffer).toString('base64');
      res.jsonp({ dataPrice: getPriceAndImage, dataImage: imageBuffer });
    } else {
      console.log('Neu khong co sp');
    }
  }
};
