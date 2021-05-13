module.exports = (sequelize, Sequelize) => {
  const Mausanpham = sequelize.define(
    'mausanpham',
    {
      idmausanpham: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tenmausanpham: {
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
  return Mausanpham;
};
