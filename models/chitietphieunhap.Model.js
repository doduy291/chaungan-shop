module.exports = (sequelize, Sequelize) => {
  const Chitiethoadon = sequelize.define(
    'chitietphieunhap',
    {
      idchitietphieunhap: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idsanpham: {
        type: Sequelize.INTEGER,
      },
      tensanpham: {
        type: Sequelize.STRING,
      },
      donvi: {
        type: Sequelize.STRING,
      },
      soluong: {
        type: Sequelize.INTEGER,
      },
      gianhap: {
        type: Sequelize.DOUBLE,
      },
      thanhtien: {
        type: Sequelize.DOUBLE,
      },
      ngaynhap: {
        type: Sequelize.DATE,
      },
      idnguoidung: {
        type: Sequelize.INTEGER,
      },
      ghichu: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Chitiethoadon;
};
