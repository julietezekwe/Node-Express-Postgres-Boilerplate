/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
