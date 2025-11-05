const { Merek } = require('../models')
const { Op } = require('sequelize');

class MerekService {
  async getAllMerek(page = 1, limit = 10, search = '') {
    const offset = (page - 1) * limit;
    
    let whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { deskripsi: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Merek.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    return {
      merek: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit)
      }
    };
  }

  async getMerekById(id){
    const merek = await Merek.findByPk(id);
    if (!merek) {
      throw new Error('Merek tidak ditemukan');
    }
    return merek;
  }

  async createMerek(merekData) {
    const merek = await Merek.create(merekData);
    return merek;
  }

  async updateMerek(id, merekData){
    const merek = await Merek.findByPk(id);

    if(!merek){
      throw new Error('Merek tidak ditemukan');
    }

    console.log(merekData)

    await merek.update(merekData);
    return await this.getMerekById(merek.id)
  }

  async deleteMerek(id){
    const merek = await Merek.findByPk(id);

    if(!merek){
      throw new Error('Merek tidak ditemukan');
    }

    await merek.destroy()
    return { message: "Merek berhasil dihapus"}
  }
}

module.exports = new MerekService()