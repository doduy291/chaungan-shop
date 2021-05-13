module.exports = (sequelize, Sequelize) => {
    const Kesanpham = sequelize.define(
        'kesanpham', {
            idke: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tenke: {
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
    return Kesanpham;
};