const { isAdmin } = require("../../middlewares/admin");
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct} = require("../controllers/products");

const productsRoutes = require("express").Router();

productsRoutes.get('/', getAllProducts);
productsRoutes.post('/', isAdmin, createProduct);
productsRoutes.get('/:id', getProductById);
productsRoutes.put('/:id', isAdmin, updateProduct);
productsRoutes.delete('/:id', isAdmin, deleteProduct);

module.exports = productsRoutes;