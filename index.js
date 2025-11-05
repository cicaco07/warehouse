require('dotenv').config();
const app = require('./app')
const { sequelize } = require('./models')

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.listen(PORT, () => {
      console.log(`Server start at PORT: ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();