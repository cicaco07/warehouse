'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Merek, {
        foreignKey: 'merekId',
        as: 'merek'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama produk tidak boleh kosong' },
        notEmpty: { msg: 'Nama produk tidak boleh kosong' }
      }
    }, 
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Harga produk tidak boleh kosong' },
        notEmpty: { msg: 'Harga produk tidak boleh kosong' }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: { msg: 'Stok tidak boleh kosong' },
        isInt: { msg: 'Stok harus berupa angka' },
        min: {
          args: [0],
          msg: 'Stok tidak boleh negatif'
        }
      }
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Deskripsi produk tidak boleh kosong' },
        notEmpty: { msg: 'Deskripsi produk tidak boleh kosong' }
      }
    },
    merekId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Mereks',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true,
    paranoid: true
  });
  return Product;
};