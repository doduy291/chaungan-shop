module.exports = (sequelize, Sequelize) => {
    const Chitiettrahang = sequelize.define(
        'chitiettrahang', {
            idchitiettrahang: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            idtrahang: {
                type: Sequelize.INTEGER,
            },
            idchitiethoadon: {
                type: Sequelize.STRING,
            },
            idsanpham: {
                type: Sequelize.STRING,
            },
            soluong: {
                type: Sequelize.INTEGER,
            },
            giahang: {
                type: Sequelize.DOUBLE,
            },
            phitra: {
                type: Sequelize.DOUBLE,
            },
            thanhtien: {
                type: Sequelize.DOUBLE,
            },
            ghichu: {
                type: Sequelize.STRING,
            },
        }, {
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Chitiettrahang;
};