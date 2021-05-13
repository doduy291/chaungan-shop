module.exports = (sequelize, Sequelize) => {
    const Sanpham = sequelize.define(
        'sanpham', {
            idsanpham: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tensanpham: {
                type: Sequelize.STRING,
            },
            ngaytao: {
                type: Sequelize.DATE,
            },
            masanpham: {
                type: Sequelize.STRING,
            },
            motasanpham: {
                type: Sequelize.TEXT,
            },
            giabanle: {
                type: Sequelize.DECIMAL(15, 2),
            },
            giabanbuon: {
                type: Sequelize.DECIMAL(15, 2),
            },
            gianhap: {
                type: Sequelize.DECIMAL(15, 0),
            },
            khoiluong: {
                type: Sequelize.INTEGER,
            },
            donvitinh: {
                type: Sequelize.STRING,
            },
            tonkho: {
                type: Sequelize.INTEGER,
            },
            idloaisanpham: {
                type: Sequelize.INTEGER,
            },
            idhangsanpham: {
                type: Sequelize.INTEGER,
            },
            thuoctinhkhachhang: {
                type: Sequelize.STRING,
            },
            anhsanpham: {
                type: Sequelize.BLOB('medium'),
            },
            idsizesanpham: {
                type: Sequelize.INTEGER,
            },
            idmausanpham: {
                type: Sequelize.INTEGER,
            },
            idke: {
                type: Sequelize.INTEGER,
            },
        }, {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Sanpham;
};