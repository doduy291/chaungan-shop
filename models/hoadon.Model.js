module.exports = (sequelize, Sequelize) => {
  const HoaDon = sequelize.define(
    'hoadon',
    {
      idhoadon: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sohoadon: {
        type: Sequelize.STRING,
      },
      ngaytaohoadon: {
        type: Sequelize.DATE,
      },
      idnguoidung: {
        type: Sequelize.INTEGER,
      },
      tinhtrang: {
        type: Sequelize.INTEGER,
      },
      tongtien: {
        type: Sequelize.DECIMAL(15, 0),
      },
      idkhachhang: {
        type: Sequelize.INTEGER,
      },
      trahang: {
        type: Sequelize.INTEGER,
      },
      diachigiaohang: {
        type: Sequelize.STRING,
      },
      hinhthucthanhtoan: {
        type: Sequelize.STRING,
      },
      trangthaihoadon: {
        type: Sequelize.INTEGER,
      },
      congno: {
        type: Sequelize.DECIMAL(15, 0),
      },
      hantracongno: {
        type: Sequelize.DATE,
      },
      loaihoadon: {
        type: Sequelize.INTEGER,
      },
      idnonkhachhang: {
        type: Sequelize.INTEGER,
      },
      tiengiaohang: {
        type: Sequelize.DOUBLE,
      },
      sodienthoai: {
        type: Sequelize.INTEGER,
      },
      view: {
        type: Sequelize.INTEGER,
      },
      idhinhthuc: {
        type: Sequelize.INTEGER,
      },
      mahuydon: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return HoaDon;
};
