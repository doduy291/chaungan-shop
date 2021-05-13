module.exports = (sequelize, Sequelize) => {
  const Hangsanpham = sequelize.define(
    'hangsanpham',
    {
      idhangsanpham: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tenhang: {
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
  return Hangsanpham;
};
