"use strict";

module.exports = (sequelize, DataTypes) => {
  const Nationality = sequelize.define(
    "Nationality",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      male: DataTypes.STRING,
      female: DataTypes.STRING,
    },
    {
      tableName: "nationalities",
    }
  );

  Nationality.associate = function (models) {
    Nationality.hasOne(models.Profile, {
      as: "profile",
      foreignKey: "nationality_id",
      targetKey: "id",
    });
  };

  Nationality.gqlNames = ["Nationality", "Nationalitys", "Nationalities"];
  return Nationality;
};
