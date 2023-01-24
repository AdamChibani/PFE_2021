"use strict";

module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define(
    "Preference",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      tableName: "preferences",
    }
  );

  Preference.associate = function (models) {
    Preference.belongsToMany(models.Profile, {
      as: "preferences",
      foreignKey: "preference_id",
      through: models.ProfilePreference,
    });
    Preference.belongsToMany(models.Country, {
      as: "countries",
      foreignKey: "preference_id",
      through: models.PreferenceCountry,
    });
  };
  Preference.gqlNames = ["Preference", "Preferences"];

  return Preference;
};
