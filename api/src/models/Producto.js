const db = require('../db/database');
const { DataTypes } = require('sequelize');

const Producto = db.define('Producto', {
    nombre:{
        type: DataTypes.STRING,
    },
    precio:{
        type: DataTypes.INTEGER
    },
    cantidad_stack:{
        type: DataTypes.INTEGER
    },
    descripcion:{
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    }
});

module.exports = Producto;