"use strict";

module.exports = (sequelize, DataTypes) => {
  const Affiliation = sequelize.define(
    "Affiliation",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      group: DataTypes.STRING,
      startDate: { type: DataTypes.STRING, field: "start_date" },
      endDate: { type: DataTypes.STRING, field: "end_date" },
      post: DataTypes.STRING,
    },
    {
      tableName: "affiliations",
    }
  );

  Affiliation.associate = function (models) {
    Affiliation.belongsTo(models.Profile, {
      as: "profile",
      foreignKey: "profile_id",
      targetKey: "id",
    });
  };
  Affiliation.gqlNames = ["Affiliation", "Affiliations"];

  return Affiliation;
};
