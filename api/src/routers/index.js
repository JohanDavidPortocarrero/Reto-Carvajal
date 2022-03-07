const {
    Router
} = require('express');
const router = Router();

router.get('/', (req, res) => res.send("<h1>No se encontro la ruta</h1>"));

const {
    getUsuarios,
    getUsuario,
    verificarUsuarioAutenticado,
    createUsuario,
    deleteUsuario,
    updateUsuario
} = require('../controllers/UsuarioController');

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuario);
router.post('/usuarios/', verificarUsuarioAutenticado);
router.post('/usuarioscreate', createUsuario);
router.delete('/usuarios/:id', deleteUsuario);
router.put('/usuarios/:id', updateUsuario);

const {
    getProductos,
    getProducto,
    createProductos,
    deleteProductos,
    updateProductos
} = require('../controllers/ProductosController');

router.get('/productos', getProductos);
router.get('/productos/:id', getProducto);
router.post('/productos', createProductos);
router.delete('/productos/:id', deleteProductos);
router.put('/productos/:id', updateProductos);

const {
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
} = require('../controllers/WishListController');

router.get('/wishlist', getWishLists);
router.get('/wishlist/:id', getWishList);
router.get('/itemwishlist/:id', getItemWishList);
router.get('/itemwishlist', getItemsWL);
router.post('/wishlist', createWishList);
router.post('/itemwishlist', addItemWishList);
router.delete('/wishlist/:id', deleteWishList);
router.delete('/itemwishlist/:id', deleteItemList);
router.put('/wishlist/:id', updateWishList);
router.put('/itemwishlist/:id', updateItemWishList);

module.exports = router;