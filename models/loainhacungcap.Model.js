module.exports = (sequelize, Sequelize) => {
    const Loainhacungcap = sequelize.define(
        'loainhacungcap', {
            idloainhacungcap: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tenloainhacungcap: {
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
    return Loainhacungcap;
};