const db = require('../db/database');
const { DataTypes } = require('sequelize');

const WishList = db.define('Wish_List', {
    id_user:{
        type: DataTypes.INTEGER
    },
    total_productos: {
        type: DataTypes.INTEGER
    },
    pago_total: {
        type: DataTypes.INTEGER
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = WishList;