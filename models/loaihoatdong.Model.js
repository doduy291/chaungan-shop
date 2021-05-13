module.exports = (sequelize, Sequelize) => {
    const Loaihoatdong = sequelize.define(
        'loaihoatdong', {
            idloaihoatdong: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tenloaihoatdong: {
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
    return Loaihoatdong;
};