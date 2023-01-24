"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProfileField = sequelize.define(
    "ProfileField",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      profileId: {
        type: DataTypes.INTEGER,
        field: "profile_id",
        references: {
          model: "Profile",
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
      tableName: "profile_fields",
    }
  );

  return ProfileField;
};
