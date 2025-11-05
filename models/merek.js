'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Merek.hasMany(models.Product, {
        foreignKey: 'merekId',
        as: 'product'
      });
    }
  }
  Merek.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama merek tidak boleh kosong' },
        notEmpty: { msg: 'Nama merek tidak boleh kosong' }
      }
    }, 
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Deskripsi merek tidak boleh kosong' },
        notEmpty: { msg: 'Deskripsi merek tidak boleh kosong' }
      }
    }
  }, {
    sequelize,
    modelName: 'Merek',
    tableName: 'Mereks',
    timestamps: true,
    paranoid: true
  });
  return Merek;
};