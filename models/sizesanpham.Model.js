module.exports = (sequelize, Sequelize) => {
  const Sizesanpham = sequelize.define(
    'sizesanpham',
    {
      idsize: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tensize: {
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
  return Sizesanpham;
};
