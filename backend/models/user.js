'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.employee, {
        onDelete: "CASCADE",
        foreignKey: "employeeId",
        as: "employee",
      })
    }
  };
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.TINYINY,
    darkMode: DataTypes.TINYINY,
    employeeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};