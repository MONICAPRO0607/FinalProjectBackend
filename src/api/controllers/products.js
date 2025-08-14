const Product = require('../models/products');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Error al obtener pedidos");
  }
};



// Crear un producto
exports.createProduct = async (req, res) => {
  try {
    const { nombre, tipo, medidas } = req.body;
    const newProduct = new Product({ nombre, tipo, medidas });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).json("Error al crear pedido");
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    return res.status(400).json("Error al obtener producto");
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const { nombre, tipo, medidas } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { nombre, tipo, medidas },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    return res.status(400).json("Error al actualizar producto");
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    return res.status(400).json("Error al eliminar el producto");
  }
};