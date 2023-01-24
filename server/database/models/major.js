"use strict";

module.exports = (sequelize, DataTypes) => {
  const Major = sequelize.define(
    "Major",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      type: DataTypes.STRING,
      major: DataTypes.STRING,
    },
    {
      tableName: "majors",
    }
  );

  Major.associate = function (models) {
    Major.hasMany(models.Education, {
      as: "majors",
      foreignKey: "major_id",
      targetKey: "id",
    });
  };
  Major.gqlNames = ["Major", "Majors"];

  return Major;
};
