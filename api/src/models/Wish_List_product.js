const db = require('../db/database');
const { DataTypes } = require('sequelize');

const WishListProduct = db.define('Wish_List_Product', {
    id_producto:{
        type: DataTypes.INTEGER
    },
    id_wish_list:{
        type: DataTypes.INTEGER
    },
    cantidad_producto: {
        type: DataTypes.INTEGER
    },
    fecha_agregada: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
});

module.exports = WishListProduct;