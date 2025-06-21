const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/dbConnection'); 

const Users = sequelize.define('Users', {
  
  username: { 
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(40), 
    allowNull: false,
    unique: true 
  },
  phone: { 
    type: DataTypes.STRING(15), 
    allowNull: false
  }
});

Users.sync();




module.exports = Users;