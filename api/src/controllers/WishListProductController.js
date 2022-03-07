const WishListProduct = require('../models/Wish_List_product');

const getWishListProducts = async (req, res) => {
    try {
        const wish_product = await WishListProduct.findAll();
        res.json(wish_product);
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const getWishListProduct = async (req, res) => {
    try {
        
        const {
            id
        } = req.params;
        const wish_product = await WishListProduct.findAll({
            where: {
                id_wish_list: id
            }
        });
        res.json(wish_product);

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const createWishListProduct = async (req, res) => {
    try {
        const {
            id_producto,
            id_wish_list,
            cantidad_producto,
            fecha_agregada
        } = req.body;

        const wish_product = await WishListProduct.create({
            id_producto,
            id_wish_list,
            cantidad_producto,
            fecha_agregada
        })

        res.json({
            mjs: "Producto añadido a la lista con exito",
            usuario: wish_product
        })
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const deleteWishListProduct = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        await WishListProduct.destroy({
            where:{
                id: id
            }
        })

        res.json({
            message: "Producto eliminado de la lista con exito"
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const updateWishListProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            id_producto,
            id_wish_list,
            cantidad_producto,
            fecha_agregada
        } = req.body;

        const wish_product = await WishListProduct.findByPk(id);

        wish_product.update({
            id_producto,
            id_wish_list,
            cantidad_producto,
            fecha_agregada
        })

        res.json({
            mjs: "Producto en lista actualizado",
            wish_product: wish_product
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
    getWishListProducts,
    getWishListProduct,
    createWishListProduct,
    deleteWishListProduct,
    updateWishListProduct
}