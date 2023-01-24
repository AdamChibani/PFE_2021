"use strict";

module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define(
    "Office",
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
      tableName: "offices",
    }
  );

  Office.associate = function (models) {
    Office.belongsTo(models.Company, {
      as: "companies",
      foreignKey: "company_id",
      targetKey: "id",
    });
    Office.hasOne(models.Address, {
      as: "address",
      foreignKey: "office_id",
      targetKey: "id",
    });
  };
  Office.gqlNames = ["Office", "Offices"];

  return Office;
};
