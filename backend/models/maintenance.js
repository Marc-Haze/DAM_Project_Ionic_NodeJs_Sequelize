'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class maintenance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      maintenance.belongsTo(models.employee, {
        onDelete: "CASCADE",
        foreignKey: "employeeId",
        as: "employee",
      })
      maintenance.belongsTo(models.ship, {
        onDelete: "CASCADE",
        foreignKey: "shipId",
        as: "ship",
      })
    }
  };
  maintenance.init({
    service: DataTypes.STRING,
    state: DataTypes.STRING,
    description: DataTypes.STRING,
    dock: DataTypes.STRING,
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'maintenance',
  });
  return maintenance;
};