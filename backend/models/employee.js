'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employee.hasOne(models.user);
    }
  };
  employee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    job: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employee;
};