// import sequelize 
var sequelize = require('sequelize')
// import connection 
var con = require('../config/database.js')

const { DataTypes } = sequelize;

// Define schema
const User = con.db.define('users', {
    // Define attributes
    username: {
      type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
      },
    level: {
      type: DataTypes.STRING
    }
  },{
    // Freeze Table Name
    freezeTableName: true
  });
   
  // Export model Product
  module.exports = { 
    User
  }