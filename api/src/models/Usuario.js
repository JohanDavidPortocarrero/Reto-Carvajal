const db = require('../db/database');
const { DataTypes } = require('sequelize');

const Usuario = db.define('Usuarios', {
    nombre:{
        type: DataTypes.STRING,
    },
    username:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
    },
    telefono:{
        type: DataTypes.STRING,
        defaultValue: "NULL"
    },
})

module.exports = Usuario;