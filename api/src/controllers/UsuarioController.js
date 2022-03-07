const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const WishList = require('../models/Wish_List');

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const getUsuario = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const usuarios = await Usuario.findByPk(id);

        if( usuarios ){
            const userForToken = {
                id: id,
                username: usuarios.username,
                nombre: usuarios.nombre,
                email: usuarios.email
            }

            const token = jwt.sign(userForToken, usuarios.password);

            res.json({
                id: id,
                username: usuarios.username,
                nombre: usuarios.nombre,
                email: usuarios.email,
                telefono: usuarios.telefono,
                token: token
            });
        }
        else{
            res.status(401).json({
                data: {},
                error: 'Usuario no encontrado'
            })
        }

        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const verificarUsuarioAutenticado  = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const usuarios = await Usuario.findAll({
            where:{
                email: email
            }
        })

        const coincidePass = usuarios === null 
            ? false
            : await bcrypt.compare(password, usuarios[0].password)
                ? true
                : password == usuarios[0].password
        
        if( usuarios && coincidePass ){
            const userForToken = {
                id: usuarios[0].id,
                username: usuarios[0].username,
                nombre: usuarios[0].nombre,
                email: usuarios[0].email
            }

            const token = jwt.sign(userForToken, password);

            res.json({
                id: usuarios[0].id,
                username: usuarios[0].username,
                nombre: usuarios[0].nombre,
                email: usuarios[0].email,
                telefono: usuarios[0].telefono,
                token: token
            });
        }
        else{
            res.status(401).json({
                data: [],
                error: 'Usuario no encontrado'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const createUsuario = async (req, res) => {

    try {
        const {
            nombre,
            username,
            email,
            password,
            telefono
        } = req.body;

        const passwordEncript = await bcrypt.hash(password, 5);

        const usuarios = await Usuario.create({
            nombre: nombre,
            username: username,
            email: email,
            password: passwordEncript,
            telefono: telefono
        })

        const w_list = await WishList.create({
            id_user: usuarios.id,
            total_productos: 0,
            pago_total: 0,
            estado: true
        })

        res.json({
            mjs: "Usuario creado",
            usuario: usuarios,
            wish_list: w_list
        })
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }

}

const deleteUsuario = async (req, res) => {
    try {

        const {
            id
        } = req.params;

        await Usuario.destroy({
            where: {
                id: id
            }
        })

        res.json({
            message: "Usuario eliminado con exito"
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const updateUsuario = async (req, res) => {
    try {

        const {
            id
        } = req.params;
        const {
            nombre,
            username,
            email,
            password,
            telefono
        } = req.body;

        const usuarios = await Usuario.findByPk(id);

        usuarios.update({
            nombre,
            username,
            email,
            password,
            telefono
        })

        res.json({
            mjs: "Usuario actualizada",
            usuario: usuarios
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }

}

module.exports = {
    getUsuarios,
    getUsuario,
    verificarUsuarioAutenticado,
    createUsuario,
    deleteUsuario,
    updateUsuario
}