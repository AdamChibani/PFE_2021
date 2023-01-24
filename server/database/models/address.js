"use strict";

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      postalCode: { type: DataTypes.STRING, field: "postal_code" },
    },
    {
      tableName: "addresses",
    }
  );

  Address.associate = function (models) {
    Address.belongsTo(models.Country, {
      as: "country",
      foreignKey: "country_id",
      targetKey: "id",
    });
  };
  Address.gqlName = ["Address", "addresses", "address"];
  return Address;
};
