const { Product, Merek } = require("../models");

class ProductService {
  async getAllProduct(page = 1, limit = 10, search = "", order = "") {
    const offset = (page - 1) * limit;

    let whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { price: { [Op.iLike]: `%${search}%` } },
        { deskripsi: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', `${order || 'ASC'}`]],
      include: [
        {
          model: Merek,
          as: "merek",
          attributes: ["id", "name", "deskripsi"],
        },
      ],
    });

    return {
      merek: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
      },
    };
  }

  async getProductById(id) {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Merek,
          as: "merek",
          attributes: ["id", "name", "deskripsi"],
        },
      ],
    });
    if (!product) {
      throw new Error("Product tidak ditemukan");
    }
    return product;
  }

  async getProductByName(name) {
    const product = await Product.findOne({ where: name });
    return product;
  }

  async createProduct(productData) {
    const merek = await Merek.findByPk(productData.merekId)

    if(!merek){
      throw new Error("Merek tidak terdaftar")
    }

    const product = await Product.create(productData);
    return product;
  }

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error("Product tidak ditemukan");
    }

    await product.update(productData);
    return await this.getProductById(product.id);
  }

  async deleteProduct(id) {
    const product = await findByPk(id);

    if (!product) {
      throw new Error("Product tidak ditemukan");
    }

    await product.destroy();
    return {
      message: "Product berhasil dihapus",
    };
  }

  async getProductStats() {
    const merekId = null;
    const produkWithMerek = await Produk.findOne({ where: { merekId: !merekId}})
    const totalBarang = await Barang.count();
    const totalStok = await Barang.sum('stok');
    const barangHabis = await Barang.count({ where: { stok: 0 } });
    const barangMinim = await Barang.count({ 
      where: { 
        stok: { [Op.gt]: 0, [Op.lte]: 10 } 
      } 
    });

    return {
      totalBarang,
      totalStok: totalStok || 0,
      barangHabis,
      barangMinim
    };
  }
}

module.exports = new ProductService();
