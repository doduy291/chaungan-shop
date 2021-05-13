module.exports = (sequelize, Sequelize) => {
    const Nhacungcap = sequelize.define(
        'nhacungcap', {
            idnhacungcap: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tennhacungcap: {
                type: Sequelize.STRING,
            },
            manhacungcap: {
                type: Sequelize.STRING,
            },
            idloainhacungcap: {
                type: Sequelize.INTEGER,
            },
            sodienthoai: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            diachi: {
                type: Sequelize.STRING,
            },
            tinh: {
                type: Sequelize.STRING,
            },
            sofax: {
                type: Sequelize.STRING,
            },
            masothue: {
                type: Sequelize.STRING,
            },
            website: {
                type: Sequelize.STRING,
            },
            idnguoidung: {
                type: Sequelize.INTEGER,
            },
            trangthai: {
                type: Sequelize.STRING,
            },
            lancuoinhaphang: {
                type: Sequelize.DATE,
            },
            tongtienhang: {
                type: Sequelize.DECIMAL(15, 2),
            },
            congno: {
                type: Sequelize.DECIMAL(15, 2),
            },
            tag: {
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
    return Nhacungcap;
};