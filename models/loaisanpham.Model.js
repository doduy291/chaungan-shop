module.exports = (sequelize, Sequelize) => {
  const Loaisanpham = sequelize.define(
    'loaisanpham',
    {
      idloaisanpham: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tenloaisanpham: {
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
  return Loaisanpham;
};
