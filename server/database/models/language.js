"use strict";

module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    "Language",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      language: DataTypes.STRING,
      read: DataTypes.STRING,
      write: DataTypes.STRING,
      speak: DataTypes.STRING,
      comprehend: DataTypes.STRING,
    },
    {
      tableName: "languages",
    }
  );

  Language.associate = function (models) {
    Language.belongsTo(models.Profile, {
      as: "profile",
      foreignKey: "profile_id",
      targetKey: "id",
    });
  };
  Language.gqlNames = ["Language", "Languages"];

  return Language;
};
