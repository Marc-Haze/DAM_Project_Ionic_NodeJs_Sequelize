'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ship.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    client: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ship',
  });
  return ship;
};