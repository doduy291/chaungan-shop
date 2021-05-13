module.exports = (sequelize, Sequelize) => {
  const Nguoidung = sequelize.define(
    'nguoidung',
    {
      idnguoidung: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idluong: {
        type: Sequelize.STRING,
      },
      tennguoidung: {
        type: Sequelize.STRING,
      },
      sodienthoai: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      gioitinh: {
        type: Sequelize.BOOLEAN,
      },
      ngaysinh: {
        type: Sequelize.DATE,
      },
      ngayvaolam: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      cmnd: {
        type: Sequelize.INTEGER(11),
      },
      tendangnhap: {
        type: Sequelize.STRING,
      },
      matkhau: {
        type: Sequelize.STRING,
      },
      anhdaidien: {
        type: Sequelize.STRING,
      },
      quyen: {
        type: Sequelize.BOOLEAN,
      },
      trangthai: {
        type: Sequelize.INTEGER,
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

  return Nguoidung;
};
