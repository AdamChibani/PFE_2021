"use strict";

module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define(
    "Field",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      specialty: DataTypes.STRING,
    },
    {
      tableName: "fields",
    }
  );

  Field.associate = function (models) {
    Field.belongsToMany(models.Profile, {
      as: "fields",
      through: models.ProfileField,
      foreignKey: "field_id",
    });
    Field.belongsToMany(models.Company, {
      as: "companies",
      through: models.CompanyField,
      foreignKey: "field_id",
    });
  };
  Field.gqlNames = ["Field", "Fields"];

  return Field;
};
