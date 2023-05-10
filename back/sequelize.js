require('dotenv').config({ debug: true, path : __dirname + "/.env" })
const { Sequelize } = require("sequelize");
let sequelize;

module.exports = async () => {

  if (sequelize) {
    return sequelize;
  }
  console.log("Les infos : " + process.env.DB_TYPE + " " + process.env.DB_HOST + " " + process.env.DB_PORT + " " + process.env.DB_NAME + " " + process.env.DB_USER + " " + process.env.DB_PASSWORD);
  sequelize = new Sequelize({ 
    database: process.env.DB_NAME, 
    username : process.env.DB_USER, 
    password : process.env.DB_PASSWORD, 
    dialect: process.env.DB_TYPE,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    logging : false
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }

  return sequelize;
};
