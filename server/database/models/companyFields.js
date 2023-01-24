"use strict";

module.exports = (sequelize, DataTypes) => {
  const CompanyField = sequelize.define(
    "CompanyField",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        field: "company_id",
        references: {
          model: "Company",
          key: "id",
        },
      },
      fieldId: {
        type: DataTypes.INTEGER,
        field: "field_id",
        references: {
          model: "Field",
          key: "id",
        },
      },
    },
    {
      tableName: "company_fields",
    }
  );

  return CompanyField;
};
