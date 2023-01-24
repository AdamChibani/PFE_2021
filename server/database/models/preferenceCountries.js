"use strict";

module.exports = (sequelize, DataTypes) => {
  const PreferenceCountry = sequelize.define(
    "PreferenceCountry",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      preferenceId: {
        type: DataTypes.INTEGER,
        field: "preference_id",
        references: {
          model: "Preference",
          key: "id",
        },
      },
      countryId: {
        type: DataTypes.INTEGER,
        field: "country_id",
        references: {
          model: "Country",
          key: "id",
        },
      },
    },
    {
      tableName: "preference_countries",
    }
  );

  return PreferenceCountry;
};
