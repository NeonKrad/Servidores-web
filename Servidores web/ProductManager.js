const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.filePath = './productos.json';

  }
  async getProducts(limit) {
    const products = await this.readProductsFromFile();

    if (limit) {
      return products.slice(0, limit);
    } else {
      return products;
    }
  }

  async getProductById(productId) {
    const products = await this.readProductsFromFile();
    return products.find(product => product.id === productId);
  }

  async readProductsFromFile() {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf8');
      const products = JSON.parse(fileData);
      return products;
    } catch (error) {
      console.error('Error reading products file:', error);
      return [];
    }
  }
}

module.exports = ProductManager;
