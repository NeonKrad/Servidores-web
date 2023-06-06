const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager(); 

app.get('/productos.json', async (req, res) => {
  try {
    const limit = req.query.limit; // Obtiene el valor del query param 'limit'
    const products = await productManager.getProducts(limit); // Llama a un método de ProductManager para obtener los productos

    res.json(products); // Devuelve los productos como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Manejo de errores
  }
});

app.get('/productos.json/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId); // Llama a un método de ProductManager para obtener un producto por su ID

    if (!product) {
      res.status(404).json({ error: 'Product not found' }); // Si no se encuentra el producto, devuelve un error 404
    } else {
      res.json(product); // Si se encuentra el producto, lo devuelve como respuesta en formato JSON
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Manejo de errores
  }
});

app.listen(4000, () => {
  console.log('Servidor escuchando en el puerto 4000');
});

