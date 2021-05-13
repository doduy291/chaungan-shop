module.exports = (sequelize, Sequelize) => {
  const Khachhang = sequelize.define(
    'khachhang',
    {
      idkhachhang: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idloaikhachhang: {
        type: Sequelize.INTEGER,
      },
      idnguoidung: {
        type: Sequelize.INTEGER,
      },
      tenkhachhang: {
        type: Sequelize.STRING,
      },
      sodienthoai: {
        type: Sequelize.STRING(10),
      },
      email: {
        type: Sequelize.STRING,
      },
      matkhau: {
        type: Sequelize.STRING,
      },
      ngaysinh: {
        type: Sequelize.DATE,
      },
      diachi: {
        type: Sequelize.STRING,
      },
      gioitinh: {
        type: Sequelize.BOOLEAN,
      },
      mangxahoi: {
        type: Sequelize.STRING,
      },
      lancuoimuahang: {
        type: Sequelize.DATE,
      },
      tongtienhang: {
        type: Sequelize.DECIMAL(15, 2),
      },
      congno: {
        type: Sequelize.DECIMAL(15, 2),
      },
      mota: {
        type: Sequelize.STRING,
      },
      tag: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      resetmatkhau: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Khachhang;
};
