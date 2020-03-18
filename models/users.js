'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};