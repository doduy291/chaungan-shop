const db = require('../server');
const DBHoaDon = db.hoadon;
const DBsanpham = db.sanpham;
const DBnhacungcap = db.nhacungcap;
const DBloaisanpham = db.loaisanpham;
const DBke = db.kesanpham;
const DBchitiethoadon = db.chitiethoadon;
const DBphieunhap = db.phieunhap;
const DBtrahang = db.trahang;
const DBchitiettrahang = db.chitiettrahang;
const DBkhachhang = db.khachhang;
const DBnonkhachhang = db.nonkhachhang;
const DBnguoidung = db.nguoidung;
const DBthuchi = db.thuchi;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const { where } = require('sequelize');

exports.findHD = async (req, res) => {
  // lay tong so tien ban hang ngay hien tai
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  const getTienBanHangToday = await DBHoaDon.findOne({
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
          tinhtrang: 1,
        },
      ],
    },
    attributes: [
      [
        Sequelize.fn('SUM', Sequelize.col('tongtien')),
        'tongtiendathanhtoanToday',
      ],
    ],
    raw: true,
    nest: true,
  });

  // lay tong so san pham
  const getTongSoSanPham = await DBsanpham.findOne({
    attributes: [
      [
        Sequelize.fn(
          'COUNT',
          Sequelize.fn('DISTINCT', Sequelize.col('tensanpham'))
        ),
        'tongsanpham',
      ],
    ],
    raw: true,
    nest: true,
  });

  // lay tong so don hang ngay hien tai
  const getDonHangToday = await DBHoaDon.findOne({
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
      ],
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idhoadon')), 'tongsohoadonToday'],
    ],
    raw: true,
    nest: true,
  });

  // tong so hang khach tra trong ngay
  const getHangkhachtratrongngay = await DBchitiettrahang.findOne({
    attributes: [
      [
        Sequelize.fn('COUNT', Sequelize.col('idchitiettrahang')),
        'hangkhachtra',
      ],
    ],
    include: [
      {
        model: DBtrahang,
        where: {
          [Op.and]: [
            {
              ngaytaohoadon: Sequelize.where(
                Sequelize.fn('day', Sequelize.col('ngaynhan')),
                day
              ),
            },
            {
              ngaytaohoadon: Sequelize.where(
                Sequelize.fn('month', Sequelize.col('ngaynhan')),
                month
              ),
            },
          ],
        },
      },
    ],
    raw: true,
    nest: true,
  });

  // don hang order tren web
  const getDonhangtrenweb = await DBHoaDon.findOne({
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
          loaihoadon: 1,
        },
      ],
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idhoadon')), 'donhangweb'],
    ],
    raw: true,
    nest: true,
  });

  // don hang order tai shop
  const getDonghangtaishop = await DBHoaDon.findOne({
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
          loaihoadon: 0,
        },
      ],
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idhoadon')), 'donhangtaishop'],
    ],
    raw: true,
    nest: true,
  });

  // tong ton kho
  const getTongTonKho = await DBsanpham.findOne({
    attributes: [[Sequelize.fn('SUM', Sequelize.col('tonkho')), 'tongtonkho']],
    raw: true,
    nest: true,
  });

  // sap het hang
  const getsaphethang = await DBsanpham.findOne({
    where: {
      tonkho: {
        [Op.between]: [0, 10],
      },
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idsanpham')), 'saphethang'],
    ],
    raw: true,
    nest: true,
  });

  // het hang
  const gethethang = await DBsanpham.findOne({
    where: { tonkho: 0 },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idsanpham')), 'hethang'],
    ],
    raw: true,
    nest: true,
  });

  // lay so nha cung cap
  const getSoNCC = await DBnhacungcap.findOne({
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idnhacungcap')), 'soNCC'],
    ],
    raw: true,
    nest: true,
  });

  // lay so loai san pham
  const getLoaiSP = await DBloaisanpham.findOne({
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idloaisanpham')), 'loaiSP'],
    ],
    raw: true,
    nest: true,
  });

  // lay so ke san pham
  const getKeSP = await DBke.findOne({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('idke')), 'keSP']],
    raw: true,
    nest: true,
  });

  // tong tien ban hang trong thang hien tai
  const getTienBanHangThang = await DBthuchi.findOne({
    where: {
      [Op.and]: [
        {
          ngaytao: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaytao')),
            month
          ),
        },
        {
          loaiphieu: 'Phiếu Thu',
        },
      ],
    },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('tongtien')), 'tienbanhangthang'],
    ],
    raw: true,
    nest: true,
  });

  // tong so don hang trong thang hien tai
  const getDonhangtrongthanghientai = await DBHoaDon.findOne({
    where: {
      [Op.and]: [
        {
          ngaytaohoadon: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
            month
          ),
        },
      ],
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idhoadon')), 'tongdonhang'],
    ],
    raw: true,
    nest: true,
  });

  // hoa don da thanh toan trong thang hien tai
  const getHDdathanhtoan = await DBHoaDon.findOne({
    where: {
      $and: Sequelize.where(
        Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
        month
      ),
      tinhtrang: 1,
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idhoadon')), 'hoadondathanhtoan'],
    ],
    raw: true,
    nest: true,
  });

  // hoa don chua thanh toan trong thang hien tai
  const getHDchuathanhtoan = await DBHoaDon.findOne({
    where: {
      $and: Sequelize.where(
        Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
        month
      ),
      tinhtrang: 0,
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idhoadon')), 'hoadonchuathanhtoan'],
    ],
    raw: true,
    nest: true,
  });

  // san pham ban duoc trong thang hien tai
  const getSPbantrongthang = await DBchitiethoadon.findOne({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('soluong')), 'sanphambantrongthang'],
    ],
    include: [
      {
        model: DBHoaDon,
        where: {
          $and: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
            month
          ),
        },
      },
    ],
    raw: true,
    nest: true,
  });

  // san pham ban trong ngay
  const getSPbantrongngay = await DBchitiethoadon.findOne({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('soluong')), 'sanphambantrongngay'],
    ],
    include: [
      {
        model: DBHoaDon,
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
          ],
        },
      },
    ],
    raw: true,
    nest: true,
  });

  // san pham tra trong ngay
  const getTrahangtrongngay = await DBchitiettrahang.findOne({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('soluong')), 'trahangtrongngay'],
    ],
    include: [
      {
        model: DBtrahang,
        where: {
          [Op.and]: [
            {
              ngaytaohoadon: Sequelize.where(
                Sequelize.fn('day', Sequelize.col('ngaynhan')),
                day
              ),
            },
            {
              ngaytaohoadon: Sequelize.where(
                Sequelize.fn('month', Sequelize.col('ngaynhan')),
                month
              ),
            },
          ],
        },
      },
    ],
    raw: true,
    nest: true,
  });

  // tong chi trong thang hien tai
  const getTongChitronngthang = await DBthuchi.findOne({
    where: {
      [Op.and]: [
        {
          ngaytao: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaytao')),
            month
          ),
        },
        {
          loaiphieu: 'Phiếu Chi',
        },
      ],
    },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('tongtien')), 'tongchitrongthang'],
    ],
    raw: true,
    nest: true,
  });

  // hang khach tra trong thang hien tai
  const getHangkhachtratrongthanghientai = await DBchitiettrahang.findOne({
    attributes: [
      [
        Sequelize.fn('SUM', Sequelize.col('soluong')),
        'hangkhachtrathanghientai',
      ],
    ],
    include: [
      {
        model: DBtrahang,
        where: {
          $and: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaynhan')),
            month
          ),
        },
      },
    ],
    raw: true,
    nest: true,
  });

  // khach no trong thang hien tai
  const getKhachnotrongthang = await DBHoaDon.findOne({
    where: {
      $and: Sequelize.where(
        Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
        month
      ),
    },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('congno')), 'khachnotrongthang'],
    ],
    raw: true,
    nest: true,
  });

  // tong thu thang truoc
  var lastmonth = date.getMonth();
  const getTongtienthangtruoc = await DBthuchi.findOne({
    where: {
      [Op.and]: [
        {
          ngaytao: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaytao')),
            lastmonth
          ),
        },
        {
          loaiphieu: 'Phiếu Thu',
        },
      ],
    },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('tongtien')), 'tongtienthangtruoc'],
    ],
    raw: true,
    nest: true,
  });

  // tong chi thang truoc
  const getTongchithangtruoc = await DBthuchi.findOne({
    where: {
      [Op.and]: [
        {
          ngaytao: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaytao')),
            lastmonth
          ),
        },
        {
          loaiphieu: 'Phiếu Chi',
        },
      ],
    },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('tongtien')), 'tongtienthangtruoc'],
    ],
    raw: true,
    nest: true,
  });

  // tong hoa don thang truoc
  const getHDthangtruoc = await DBHoaDon.findOne({
    where: {
      $and: Sequelize.where(
        Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
        lastmonth
      ),
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idhoadon')), 'hoadonthangtruoc'],
    ],
    raw: true,
    nest: true,
  });

  // hoa don da thanh toan thang truoc
  const getHDdathanhtoanthangtruoc = await DBHoaDon.findOne({
    where: {
      $and: Sequelize.where(
        Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
        lastmonth
      ),
      tinhtrang: 1,
    },
    attributes: [
      [
        Sequelize.fn('COUNT', Sequelize.col('idhoadon')),
        'hoadondathanhtoanthangtruoc',
      ],
    ],
    raw: true,
    nest: true,
  });

  // hoa don chua thanh toan thang truoc
  const getHDchuathanhtoanthangtruoc = await DBHoaDon.findOne({
    where: {
      $and: Sequelize.where(
        Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
        lastmonth
      ),
      tinhtrang: 0,
    },
    attributes: [
      [
        Sequelize.fn('COUNT', Sequelize.col('idhoadon')),
        'hoadondathanhtoanthangtruoc',
      ],
    ],
    raw: true,
    nest: true,
  });

  // so san pham ban thang truoc
  const getSPbanthangtruoc = await DBchitiethoadon.findOne({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('soluong')), 'sanphambanthangtruoc'],
    ],
    include: [
      {
        model: DBHoaDon,
        where: {
          $and: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
            lastmonth
          ),
        },
      },
    ],
    raw: true,
    nest: true,
  });

  // hang khach tra thang truoc
  const getHangkhachtrathangtruoc = await DBchitiettrahang.findOne({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('soluong')), 'hangkhachtrathangtruoc'],
    ],
    include: [
      {
        model: DBtrahang,
        where: {
          $and: Sequelize.where(
            Sequelize.fn('month', Sequelize.col('ngaynhan')),
            lastmonth
          ),
        },
      },
    ],
    raw: true,
    nest: true,
  });

  // khach no trong ngay
  const getKhachnotrongngay = await DBHoaDon.findOne({
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
      ],
    },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('congno')), 'khachnotrongngay'],
    ],
    raw: true,
    nest: true,
  });

  // khach no thang truoc
  const getKhachnothangtruoc = await DBHoaDon.findOne({
    where: {
      $and: Sequelize.where(
        Sequelize.fn('month', Sequelize.col('ngaytaohoadon')),
        lastmonth
      ),
    },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('congno')), 'khachnnothangtruoc'],
    ],
    raw: true,
    nest: true,
  });

  // hoa don chua duyet hom nay
  const getHDchuaduyet = await DBHoaDon.findOne({
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
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('idhoadon')), 'hoadonchuaduyet'],
    ],
    raw: true,
    nest: true,
  });

  res.render('admin/index', {
    HDToday: getTienBanHangToday,
    DonhangToday: getDonHangToday,
    SP: getTongSoSanPham,
    Donhangweb: getDonhangtrenweb,
    Donhangshop: getDonghangtaishop,
    Tienbanhangthang: getTienBanHangThang,
    Tongdonhang: getDonhangtrongthanghientai,
    Dathanhtoan: getHDdathanhtoan,
    Chuathanhtoan: getHDchuathanhtoan,
    SPbantrongthang: getSPbantrongthang,
    Tonkho: getTongTonKho,
    Saphethang: getsaphethang,
    Hethang: gethethang,
    NCC: getSoNCC,
    LoaiSP: getLoaiSP,
    KeSP: getKeSP,
    Tongchitrongthang: getTongChitronngthang,
    Trahang: getHangkhachtratrongthanghientai,
    Khachnotrongthang: getKhachnotrongthang,
    Tongtienthangtruoc: getTongtienthangtruoc,
    Tongchithangtruoc: getTongchithangtruoc,
    HDthangtruoc: getHDthangtruoc,
    HDdathanhtoanthangtruoc: getHDdathanhtoanthangtruoc,
    HDchuathanhtoanthangtruoc: getHDchuathanhtoanthangtruoc,
    SPbanthangtruoc: getSPbanthangtruoc,
    Trahangthangtruoc: getHangkhachtrathangtruoc,
    Khachnothangtruoc: getKhachnothangtruoc,
    HDchuaduyet: getHDchuaduyet,
    Hangkhachtratrongngay: getHangkhachtratrongngay,
    Khachnotrongngay: getKhachnotrongngay,
    SPbantrongngay: getSPbantrongngay,
    Trahangtrongngay: getTrahangtrongngay,
  });

  //testing
  // return res.status(200).json({
  //   message: 'Hiển thị trang thống kê tổng quan thành công',
  //   HDToday: getTienBanHangToday,
  //   DonhangToday: getDonHangToday,
  //   SP: getTongSoSanPham,
  //   Donhangweb: getDonhangtrenweb,
  //   Donhangshop: getDonghangtaishop,
  //   Tienbanhangthang: getTienBanHangThang,
  //   Tongdonhang: getDonhangtrongthanghientai,
  //   Dathanhtoan: getHDdathanhtoan,
  //   Chuathanhtoan: getHDchuathanhtoan,
  //   SPbantrongthang: getSPbantrongthang,
  //   Tonkho: getTongTonKho,
  //   Saphethang: getsaphethang,
  //   Hethang: gethethang,
  //   NCC: getSoNCC,
  //   LoaiSP: getLoaiSP,
  //   KeSP: getKeSP,
  //   Tongchitrongthang: getTongChitronngthang,
  //   Trahang: getHangkhachtratrongthanghientai,
  //   Khachnotrongthang: getKhachnotrongthang,
  //   Tongtienthangtruoc: getTongtienthangtruoc,
  //   Tongchithangtruoc: getTongchithangtruoc,
  //   HDthangtruoc: getHDthangtruoc,
  //   HDdathanhtoanthangtruoc: getHDdathanhtoanthangtruoc,
  //   HDchuathanhtoanthangtruoc: getHDchuathanhtoanthangtruoc,
  //   SPbanthangtruoc: getSPbanthangtruoc,
  //   Trahangthangtruoc: getHangkhachtrathangtruoc,
  //   Khachnothangtruoc: getKhachnothangtruoc,
  //   HDchuaduyet: getHDchuaduyet,
  //   Hangkhachtratrongngay: getHangkhachtratrongngay,
  //   Khachnotrongngay: getKhachnotrongngay,
  //   SPbantrongngay: getSPbantrongngay,
  //   Trahangtrongngay: getTrahangtrongngay,
  // });
};

exports.findAllHDdathanhtoan = async (req, res) => {
  // danh sach hoa don da thanh toan trong ngay hien tai
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  const message_err = req.flash('message_err');
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
          tinhtrang: 1,
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
};

exports.findAllHDToday = async (req, res) => {
  // danh sach tong hoa don trong ngay
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  const message_err = req.flash('message_err');
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
};
