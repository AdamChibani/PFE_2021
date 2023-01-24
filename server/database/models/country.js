"use strict";

module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "Country",
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
      tableName: "countries",
    }
  );

  Country.associate = function (models) {
    Country.belongsToMany(models.Preference, {
      as: "countries",
      foreignKey: "country_id",
      through: models.PreferenceCountry,
    });
    Country.belongsTo(models.Continent, {
      as: "continent",
      foreignKey: "continent_id",
      targetKey: "id",
    });
  };
  Country.gqlNames = ["Country", "Countrys", "Countries"];

  return Country;
};
