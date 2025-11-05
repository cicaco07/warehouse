const merekService = require('../service/merekService')

class merekController {
  async getAllMerek(req, res){
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await merekService.getAllMerek(page, limit, search);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  async getMerekById(req, res){
    try {
      const { id } = req.params;
      const merek = await merekService.getMerekById(id);

      res.status(200).json({
        success: true,
        data: merek
      });
    } catch (error) {
      if (error.message === 'Merek tidak ditemukan') {
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

  async createMerek(req, res) {
    try {
      const merekData = {
        ...req.body,
      }

      const merek = await merekService.createMerek(merekData);

      res.status(201).json({
        success: true,
        message: 'Merek berhasil ditambahkan',
        data: merek
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateMerek(req, res){
    try {
      const { id } = req.params;
      const merekData = req.body;
      console.log(merekData)

      const merek = await merekService.updateMerek(id, merekData);

      res.status(200).json({
        success: true,
        message: 'Merek berhasil diupdate',
        data: merek
      });
    } catch(error) {
      if (error.message === 'Merek tidak ditemukan') {
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

  async deleteMerek(req, res) {
    try {
      const { id } = req.params;
      const result = await merekService.deleteMerek(id);

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      if (error.message === 'Merek tidak ditemukan') {
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

module.exports = new merekController();