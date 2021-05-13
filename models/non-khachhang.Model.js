module.exports = (sequelize, Sequelize) => {
  const Nonkhachhang = sequelize.define(
    'nonkhachhang',
    {
      idnonkhachhang: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sessionID: {
        type: Sequelize.STRING,
      },
      hovaten: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      sodienthoai: {
        type: Sequelize.CHAR(10),
      },
      role: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Nonkhachhang;
};
