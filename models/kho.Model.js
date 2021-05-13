module.exports = (sequelize, Sequelize) => {
  const Kho = sequelize.define(
    'kho',
    {
      idkho: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idsanpham: {
        type: Sequelize.INTEGER,
      },
      idphieunhap: {
        type: Sequelize.STRING,
      },
      tonkho: {
        type: Sequelize.INTEGER,
      },
      hangdangve: {
        type: Sequelize.INTEGER,
      },
      trangthai: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Kho;
};
