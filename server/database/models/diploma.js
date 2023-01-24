"use strict";

module.exports = (sequelize, DataTypes) => {
  const Diploma = sequelize.define(
    "Diploma",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      diploma: DataTypes.STRING,
    },
    {
      tableName: "diplomas",
    }
  );

  Diploma.associate = function (models) {
    Diploma.hasMany(models.Education, {
      as: "diplomas",
      foreignKey: "diploma_id",
      targetKey: "id",
    });
  };
  Diploma.gqlNames = ["Diploma", "Diplomas"];

  return Diploma;
};
