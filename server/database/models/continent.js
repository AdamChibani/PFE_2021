"use strict";

module.exports = (sequelize, DataTypes) => {
  const Continent = sequelize.define(
    "Continent",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: "continents",
    }
  );

  Continent.associate = function (models) {
    Continent.hasMany(models.Country, {
      as: "continents",
      foreignKey: "continent_id",
      targetKey: "id",
    });
  };
  Continent.gqlNames = ["Continent", "Continents", "continents"];

  return Continent;
};
