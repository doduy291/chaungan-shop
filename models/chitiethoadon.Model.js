module.exports = (sequelize, Sequelize) => {
  const Chitiethoadon = sequelize.define(
    'chitiethoadon',
    {
      idchitiethoadon: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idhoadon: {
        type: Sequelize.INTEGER,
      },
      idsanpham: {
        type: Sequelize.INTEGER,
      },
      soluong: {
        type: Sequelize.INTEGER,
      },
      thanhtien: {
        type: Sequelize.DECIMAL(15, 2),
      },
      uudai: {
        type: Sequelize.DECIMAL(15, 2),
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
