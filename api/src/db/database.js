const { Sequelize } = require("sequelize");

const db = new Sequelize({
    database: "db47grhagcma2i",
    username: "fhoanwxkqizgbu",
    password: "df299f5d4c1afbfe3650c00065ab157931e3dc9c74e591ffd54080ddcb8472dc",
    host: "ec2-3-234-152-113.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
  })

module.exports = db;