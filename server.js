const dbConfig = require('./configs/db.config');
const Sequelize = require('sequelize');

// Database Connection
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  //timezone database
  timezone: '+07:00',
  // Remove alert "Executing (default)..."
  logging: false,
});

sequelize
  .authenticate()
  .then((err) => {
    // console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
    return;
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Require Model
db.nguoidung = require('./models/userModel')(sequelize, Sequelize);
db.khachhang = require('./models/khachhang.Model')(sequelize, Sequelize);
db.nonkhachhang = require('./models/non-khachhang.Model')(sequelize, Sequelize);
db.sanpham = require('./models/sanpham.Model')(sequelize, Sequelize);
db.loaisanpham = require('./models/loaisanpham.Model')(sequelize, Sequelize);
db.sizesanpham = require('./models/sizesanpham.Model')(sequelize, Sequelize);
db.hangsanpham = require('./models/hangsanpham.Model')(sequelize, Sequelize);
db.mausanpham = require('./models/mausanpham.Model')(sequelize, Sequelize);
db.hoadon = require('./models/hoadon.Model')(sequelize, Sequelize);
db.chitiethoadon = require('./models/chitiethoadon.Model')(
  sequelize,
  Sequelize
);
db.phieunhap = require('./models/phieunhap.Model')(sequelize, Sequelize);
db.nhacungcap = require('./models/nhacungcap.Model')(sequelize, Sequelize);
db.chitietphieunhap = require('./models/chitietphieunhap.Model')(
  sequelize,
  Sequelize
);
db.loaikhachhang = require('./models/loaikhachhang.Model')(
  sequelize,
  Sequelize
);
db.loainhacungcap = require('./models/loainhacungcap.Model')(
  sequelize,
  Sequelize
);
db.kho = require('./models/kho.Model')(sequelize, Sequelize);
db.kesanpham = require('./models/kesanpham.Model')(sequelize, Sequelize);
db.trahang = require('./models/trahang.Model')(sequelize, Sequelize);
db.hoatdong = require('./models/hoatdong.Model')(sequelize, Sequelize);
db.loaihoatdong = require('./models/loaihoatdong.Model')(sequelize, Sequelize);
db.hinhthucgiaohang = require('./models/hinhthucgiaohang.Model')(
  sequelize,
  Sequelize
);
db.chitiettrahang = require('./models/chitiettrahang.Model')(
  sequelize,
  Sequelize
);
db.thuchi = require('./models/thuchi.Model')(sequelize, Sequelize);

// Associations
// Nguoidung FK - Khachhang
db.nguoidung.hasMany(db.khachhang, {
  foreignKey: 'idnguoidung',
  sourceKey: 'idnguoidung',
});
db.khachhang.belongsTo(db.nguoidung, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});

// Loaisanpham, hangsanpham, mausanpham, sizesanpham FK - Sanpham
db.loaisanpham.hasMany(db.sanpham, {
  foreignKey: 'idloaisanpham',
  sourceKey: 'idloaisanpham',
});
db.hangsanpham.hasMany(db.sanpham, {
  foreignKey: 'idhangsanpham',
  sourceKey: 'idhangsanpham',
});
db.mausanpham.hasMany(db.sanpham, {
  foreignKey: 'idmausanpham',
  sourceKey: 'idmausanpham',
});
db.sizesanpham.hasMany(db.sanpham, {
  foreignKey: 'idsizesanpham',
  sourceKey: 'idsize',
});
db.sanpham.belongsTo(db.loaisanpham, {
  foreignKey: 'idloaisanpham',
  targetKey: 'idloaisanpham',
});
db.sanpham.belongsTo(db.hangsanpham, {
  foreignKey: 'idhangsanpham',
  targetKey: 'idhangsanpham',
});
db.sanpham.belongsTo(db.mausanpham, {
  foreignKey: 'idmausanpham',
  targetKey: 'idmausanpham',
});
db.sanpham.belongsTo(db.sizesanpham, {
  foreignKey: 'idsizesanpham',
  targetKey: 'idsize',
});

// Sanpham, hoadon FK - Chitiethoadon (Many to Many)
db.sanpham.belongsToMany(db.hoadon, {
  through: 'chitiethoadon',
  foreignKey: 'idsanpham',
});
db.hoadon.belongsToMany(db.sanpham, {
  through: 'chitiethoadon',
  foreignKey: 'idhoadon',
});

// Sanpham FK - Chitiethoadon
db.chitiethoadon.belongsTo(db.sanpham, {
  foreignKey: 'idsanpham',
  targetKey: 'idsanpham',
});
db.sanpham.hasMany(db.chitiethoadon, {
  foreignKey: 'idsanpham',
  sourceKey: 'idsanpham',
});

// Sanpham FK - Kho
db.kho.belongsTo(db.sanpham, {
  foreignKey: 'idsanpham',
  targetKey: 'idsanpham',
});
db.sanpham.hasMany(db.kho, {
  foreignKey: 'idsanpham',
  sourceKey: 'idsanpham',
});
//<===================================================================================================>
// Nguoidung, hoadon FK
db.hoadon.belongsTo(db.nguoidung, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});
db.nguoidung.hasMany(db.hoadon, {
  foreignKey: 'idnguoidung',
  sourceKey: 'idnguoidung',
});
db.hoadon.belongsTo(db.khachhang, {
  foreignKey: 'idkhachhang',
  targetKey: 'idkhachhang',
});
db.khachhang.hasMany(db.hoadon, {
  foreignKey: 'idkhachhang',
  sourceKey: 'idkhachhang',
});
db.hoadon.belongsTo(db.nonkhachhang, {
  foreignKey: 'idnonkhachhang',
  targetKey: 'idnonkhachhang',
});
db.nonkhachhang.hasMany(db.hoadon, {
  foreignKey: 'idnonkhachhang',
  sourceKey: 'idnonkhachhang',
});

// Phieunhap, nhacungcap
db.phieunhap.belongsTo(db.nhacungcap, {
  foreignKey: 'idnhacungcap',
  targetKey: 'idnhacungcap',
});
db.nhacungcap.hasMany(db.phieunhap, {
  foreignKey: 'idnhacungcap',
  sourceKey: 'idnhacungcap',
});

// phiếu nhập -  người dùng
db.phieunhap.belongsTo(db.nguoidung, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});
db.nguoidung.hasMany(db.phieunhap, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});

// khách hàng - loại khách hàng
db.khachhang.belongsTo(db.loaikhachhang, {
  foreignKey: 'idloaikhachhang',
  targetKey: 'idloaikhachhang',
});
db.loaikhachhang.hasMany(db.khachhang, {
  foreignKey: 'idloaikhachhang',
  sourceKey: 'idloaikhachhang',
});

//nhà cung cấp - loại nhà cung cấp
db.nhacungcap.belongsTo(db.loainhacungcap, {
  foreignKey: 'idloainhacungcap',
  targetKey: 'idloainhacungcap',
});
db.loainhacungcap.hasMany(db.nhacungcap, {
  foreignKey: 'idloainhacungcap',
  targetKey: 'idloainhacungcap',
});

//nhà cung cấp - người dùng
db.nhacungcap.belongsTo(db.nguoidung, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});
db.nguoidung.hasMany(db.nhacungcap, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});

//kho - sản phẩm
db.kho.belongsTo(db.sanpham, {
  foreignKey: 'idsanpham',
  targetKey: 'idsanpham',
});
db.sanpham.hasMany(db.kho, { foreignKey: 'idsanpham', targetKey: 'idsanpham' });

//kho - phiếu nhập
db.kho.belongsTo(db.phieunhap, {
  foreignKey: 'idphieunhap',
  targetKey: 'idphieunhap',
});
db.phieunhap.hasMany(db.kho, {
  foreignKey: 'idphieunhap',
  targetKey: 'idphieunhap',
});

//san pham - ke san pham
db.sanpham.belongsTo(db.kesanpham, { foreignKey: 'idke', targetKey: 'idke' });
db.kesanpham.hasMany(db.sanpham, { foreignKey: 'idke', targetKey: 'idke' });

//tra hang - hoa don
db.trahang.belongsTo(db.hoadon, {
  foreignKey: 'idhoadon',
  targetKey: 'idhoadon',
});
db.hoadon.hasMany(db.trahang, {
  foreignKey: 'idhoadon',
  targetKey: 'idhoadon',
});

//tra hang - khach hang
db.trahang.belongsTo(db.khachhang, {
  foreignKey: 'idkhachhang',
  targetKey: 'idkhachhang',
});
db.khachhang.hasMany(db.trahang, {
  foreignKey: 'idkhachhang',
  targetKey: 'idkhachhang',
});

//tra hang - nguoi dung
db.trahang.belongsTo(db.nguoidung, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});
db.nguoidung.hasMany(db.trahang, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});

// tra hang - san pham
db.sanpham.belongsToMany(db.trahang, {
  through: 'chitiettrahang',
  foreignKey: 'idsanpham',
});

db.trahang.belongsToMany(db.sanpham, {
  through: 'chitiettrahang',
  foreignKey: 'idtrahang',
});

//hoat dong - loai hoat dong
db.hoatdong.belongsTo(db.loaihoatdong, {
  foreignKey: 'idloaihoatdong',
  targetKey: 'idloaihoatdong',
});
db.loaihoatdong.hasMany(db.hoatdong, {
  foreignKey: 'idloaihoatdong',
  targetKey: 'idloaihoatdong',
});

//hoat dong - nguoi dung
db.hoatdong.belongsTo(db.nguoidung, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});
db.nguoidung.hasMany(db.hoatdong, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});

// hoa don - hinh thuc giao hang
db.hoadon.belongsTo(db.hinhthucgiaohang, {
  foreignKey: 'idhinhthuc',
  targetKey: 'idhinhthuc',
});
db.hinhthucgiaohang.hasMany(db.hoadon, {
  foreignKey: 'idhinhthuc',
  targetKey: 'idhinhthuc',
});

// chi tiet hoa don - hoa don
db.chitiethoadon.belongsTo(db.hoadon, {
  foreignKey: 'idhoadon',
  targetKey: 'idhoadon',
});
db.hoadon.hasMany(db.chitiethoadon, {
  foreignKey: 'idhoadon',
  targetKey: 'idhoadon',
});

// chi tiet tra hang - tra hang
db.chitiettrahang.belongsTo(db.trahang, {
  foreignKey: 'idtrahang',
  targetKey: 'idtrahang',
});
db.trahang.hasMany(db.chitiettrahang, {
  foreignKey: 'idtrahang',
  targetKey: 'idtrahang',
});

// chi tiet tra hang - san pham
db.chitiettrahang.belongsTo(db.sanpham, {
  foreignKey: 'idsanpham',
  targetKey: 'idsanpham',
});
db.sanpham.hasMany(db.chitiettrahang, {
  foreignKey: 'idsanpham',
  sourceKey: 'idsanpham',
});

// thu chi - nha cung cap
db.nhacungcap.hasMany(db.thuchi, {
  foreignKey: 'idnhacungcap',
  targetKey: 'idnhacungcap',
});
db.thuchi.belongsTo(db.nhacungcap, {
  foreignKey: 'idnhacungcap',
  targetKey: 'idnhacungcap',
});

// thu chi - khach hang
db.khachhang.hasMany(db.thuchi, {
  foreignKey: 'idkhachhang',
  targetKey: 'idkhachhang',
});
db.thuchi.belongsTo(db.khachhang, {
  foreignKey: 'idkhachhang',
  targetKey: 'idkhachhang',
});

// thu chi - nguoi dung
db.nguoidung.hasMany(db.thuchi, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});
db.thuchi.belongsTo(db.nguoidung, {
  foreignKey: 'idnguoidung',
  targetKey: 'idnguoidung',
});

// Đồng bộ cơ sở dữ liệu Sequelize Sync
sequelize.sync();
// sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });
module.exports = db;
