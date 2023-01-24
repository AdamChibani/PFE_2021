"use strict";

module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define(
    "Certification",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      instution: DataTypes.STRING,
      date: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      level: DataTypes.STRING,
    },
    {
      tableName: "certifications",
    }
  );

  Certification.associate = function (models) {
    Certification.belongsTo(models.Profile, {
      as: "certifications",
      foreignKey: "profile_id",
      targetKey: "id",
    });
  };
  Certification.gqlNames = ["Certification", "Certifications"];

  return Certification;
};
