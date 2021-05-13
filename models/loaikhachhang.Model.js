module.exports = (sequelize, Sequelize) => {
  const Loaikhachhang = sequelize.define(
    'loaikhachhang',
    {
      idloaikhachhang: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tenloaikhachhang: {
        type: Sequelize.STRING,
      },
      uudai: {
        type: Sequelize.STRING,
      },
      mota: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Loaikhachhang;
};
