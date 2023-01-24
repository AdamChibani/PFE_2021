"use strict";

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      enterpriseSize: { type: DataTypes.INTEGER, field: "enterprise_size" },
      taxId: DataTypes.INTEGER,
      isAgency: { type: DataTypes.BOOLEAN, field: "is_agency" },
      email: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      postalCode: { type: DataTypes.STRING, field: "postal_code" },
    },
    {
      tableName: "companies",
    }
  );

  Company.associate = function (models) {
    Company.belongsToMany(models.Field, {
      as: "fields",
      through: models.CompanyField,
      foreignKey: "company_id",
    });
    Company.hasMany(models.Office, {
      as: "offices",
      foreignKey: "company_id",
      targetKey: "id",
    });
    Company.hasMany(models.User, {
      as: "consultants",
      foreignKey: "company_id",
      targetKey: "id",
    });
    Company.belongsTo(models.Country, {
      as: "country",
      foreignKey: "country_id",
      targetKey: "id",
    });
    Company.belongsTo(models.State, {
      as: "states",
      foreignKey: "state_id",
      targetKey: "id",
    });
  };
  Company.gqlNames = ["Company", "Companies"];

  return Company;
};
