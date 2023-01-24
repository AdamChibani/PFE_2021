"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProfilePreference = sequelize.define(
    "ProfilePreference",
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
      preferenceId: {
        type: DataTypes.INTEGER,
        field: "preference_id",
        references: {
          model: "Preference",
          key: "id",
        },
      },
    },
    {
      tableName: "profile_preferences",
    }
  );
  ProfilePreference.associate = function (models) {
    ProfilePreference.hasOne(models.Preference, {
      as: "preferences",
      foreignKey: "id",
      targetKey: "id",
    });
  };

  return ProfilePreference;
};
