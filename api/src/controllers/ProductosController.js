const Producto = require('../models/Producto');

const getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const getProducto = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const productos = await Producto.findByPk(id);
        res.json(productos);
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const createProductos = async (req, res) => {
    try {
        const {
            nombre,
            precio,
            cantidad_stack,
            descripcion,
            categoria
        } = req.body;

        const productos = await Producto.create({
            nombre,
            precio,
            cantidad_stack,
            descripcion,
            categoria
        })

        res.json({
            mjs: "Producto creado con exito",
            producto: productos
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const deleteProductos = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        await Producto.destroy({
            where:{
                id: id
            }
        })

        res.json({
            message: "Producto eliminado con exito"
        })
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const updateProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            precio,
            cantidad_stack,
            descripcion,
            categoria
        } = req.body;

        const productos = await Producto.findByPk(id);

        productos.update({
            nombre,
            precio,
            cantidad_stack,
            descripcion,
            categoria
        })

        res.json({
            mjs: "Producto actualizada",
            producto: productos
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
    getProductos,
    getProducto,
    createProductos,
    deleteProductos,
    updateProductos
}