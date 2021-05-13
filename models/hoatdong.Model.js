module.exports = (sequelize, Sequelize) => {
    const Hoatdong = sequelize.define(
        'hoatdong', {
            idhoatdong: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            idloaihoatdong: {
                type: Sequelize.INTEGER,
            },
            idnguoidung: {
                type: Sequelize.INTEGER,
            },
            thoigianhoatdong: {
                type: Sequelize.DATE,
            },
        }, {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Hoatdong;
};