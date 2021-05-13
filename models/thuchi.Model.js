module.exports = (sequelize, Sequelize) => {
    const ThuChi = sequelize.define(
        'ThuChi', {
            idthuchi: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            mathuchi: {
                type: Sequelize.STRING,
            },
            idnhacungcap: {
                type: Sequelize.INTEGER,
            },
            idkhachhang: {
                type: Sequelize.INTEGER,
            },
            idnguoidung: {
                type: Sequelize.INTEGER,
            },
            loaiphieu: {
                type: Sequelize.STRING,
            },
            ngaytao: {
                type: Sequelize.DATE,
            },
            hangmucthuchi: {
                type: Sequelize.STRING,
            },
            tongtien: {
                type: Sequelize.DECIMAL(15, 0),
            },
            ghichu: {
                type: Sequelize.STRING,
            }
        }, {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return ThuChi;
};