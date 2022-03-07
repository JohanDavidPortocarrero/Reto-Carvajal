const WishList = require('../models/Wish_List');
const WishListProduct = require('../models/Wish_List_product');

const getWishLists = async (req, res) => {
    try {
        const wish = await WishList.findAll();
        const w_product = await WishListProduct.findAll();

        const jsonList = wish.map( data => {
            return {
                id: data.id,
                id_user: data.id_user,
                total_productos: data.total_productos,
                pago_total: data.pago_total,
                estado: data.estado,
                item: w_product.filter( product =>  data.id === product.id_wish_list && product !== null )
            }
        } )

        res.json(jsonList);

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const getItemsWL = async (rep, res) => {
    try {

        const w_product = await WishListProduct.findAll();

        res.json(w_product);

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const getItemWishList = async (req, res) => {
    try {

        const {
            id
        } = req.params;

        const w_product = await WishListProduct.findAll({
            where:{
                id:id
            }
        });

        res.json(w_product);

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const getWishList = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const wish = await WishList.findAll({
            where:{
                id_user: id,
                estado: true
            }
        });

        const w_product = await WishListProduct.findAll();

        let jsonList = wish.map( data => {

            return {
                id: data.id,
                id_user: data.id_user,
                total_productos: data.total_productos,
                pago_total: data.pago_total,
                estado: data.estado,
                item: w_product.filter( product =>  data.id === product.id_wish_list && product !== null )
            }
        } )


        res.json(jsonList);


    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const createWishList = async (req, res) => {
    try {
        const {
            id_user,
            total_productos,
            pago_total,
            estado
        } = req.body;

        const wish = await WishList.create({
            id_user,
            total_productos,
            pago_total,
            estado
        })

        res.json({
            mjs: "La lista de deseo hacido creada con exito",
            listWish: wish
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const deleteWishList = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        await WishList.destroy({
            where: {
                id: id
            }
        })

        await WishListProduct.destroy({
            where: {
                id_wish_list: id
            }
        })

        res.json({
            message: "Lista eliminado con exito",
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const deleteItemList = async (req, res) => {
    try {

        const {
            id
        } = req.params;

        await WishListProduct.destroy({
            where: {
                id: id
            }
        })

        res.json({
            message: "Item eliminado con exito",
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const updateWishList = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            id_user,
            total_productos,
            pago_total,
            estado
        } = req.body;

        const wish = await WishList.findByPk(id);

        wish.update({
            id_user,
            total_productos,
            pago_total,
            estado
        })

        res.json({
            mjs: "Lista actualizada",
            lista: wish
        })


    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const updateItemWishList = async (req, res) => {
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
            Item: wish_product
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            data: {},
            error: error
        })
    }
}

const addItemWishList = async (req, res) => {
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
            mjs: "El item fue añadido a la lista con exito",
            item: wish_product
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
    getWishLists,
    getWishList,
    getItemWishList,
    getItemsWL,
    createWishList,
    addItemWishList,
    deleteWishList,
    deleteItemList,
    updateWishList,
    updateItemWishList
}