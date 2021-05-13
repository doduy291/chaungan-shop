module.exports = (sequelize, Sequelize) => {
  const Phieunhap = sequelize.define(
    'phieunhap',
    {
      idphieunhap: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idnhacungcap: {
        type: Sequelize.INTEGER,
      },
      idnguoidung: {
        type: Sequelize.INTEGER,
      },
      sophieunhap: {
        type: Sequelize.INTEGER,
      },
      ngaynhap: {
        type: Sequelize.INTEGER,
      },
      thanhtien: {
        type: Sequelize.DOUBLE,
      },
      hinhthucthanhtoan: {
        type: Sequelize.INTEGER,
      },
      hinhthucnhap: {
        type: Sequelize.STRING,
      },
      trangthai: {
        type: Sequelize.INTEGER,
      },
      nhapkho: {
        type: Sequelize.DATE,
      },
      thanhtoan: {
        type: Sequelize.STRING,
      },
      congno: {
        type: Sequelize.DOUBLE,
      },
      hantracongno: {
        type: Sequelize.DATE,
      },
      tag: {
        type: Sequelize.INTEGER,
      },
      ghichu: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Phieunhap;
};
