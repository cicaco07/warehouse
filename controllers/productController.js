const productService = require('../service/productService')

class ProductController {
  async getAllProduct(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await productService.getAllProduct(page, limit, search);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch(error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  async getProductById(req, res){
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      if (error.message === 'Produk tidak ditemukan') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  async createProduct(req, res) {
    try {
      const productData = {
        ...req.body,
        merekId: req.body.merekId
      };

      const product = await productService.createProduct(productData);
      res.status(201).json({
        success: true,
        message: 'Product berhasil ditambahkan',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateProduct(req, res){
    try {
      const { id } = req.params;
      const productData = req.body;

      const product = await productService.updateProduct(id, productData);

      res.status(200).json({
        success: true,
        message: 'Product berhasil diupdate',
        data: product
      });
    } catch (error) {
      if (error.message === 'Product tidak ditemukan') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteProduct(req, res){
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(id);

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      if (error.message === 'Produk tidak ditemukan') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }
}

module.exports = new ProductController();