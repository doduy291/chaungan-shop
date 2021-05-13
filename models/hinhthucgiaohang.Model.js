module.exports = (sequelize, Sequelize) => {
    const Hinhthucgiaohang = sequelize.define(
        'hinhthucgiaohang', {
            idhinhthuc: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tenhinhthuc: {
                type: Sequelize.STRING,
            },
            mota: {
                type: Sequelize.STRING,
            },
        }, {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Hinhthucgiaohang;
};