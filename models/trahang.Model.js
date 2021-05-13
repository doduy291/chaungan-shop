module.exports = (sequelize, Sequelize) => {
    const Trahang = sequelize.define(
        'trahang', {
            idtrahang: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            idhoadon: {
                type: Sequelize.INTEGER,
            },
            idkhachhang: {
                type: Sequelize.INTEGER,
            },
            idnguoidung: {
                type: Sequelize.INTEGER,
            },
            sotrahang: {
                type: Sequelize.STRING,
            },
            trangthai: {
                type: Sequelize.STRING,
            },
            hoantien: {
                type: Sequelize.STRING,
            },
            tongtien: {
                type: Sequelize.DECIMAL(15, 2),
            },
            ngaynhan: {
                type: Sequelize.DATE,
            },
            lydotra: {
                type: Sequelize.STRING,
            },
            hinhthucthanhtoan: {
                type: Sequelize.STRING,
            },
        }, {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Trahang;
};