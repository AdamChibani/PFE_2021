"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProfileSkill = sequelize.define(
    "ProfileSkill",
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
      skillId: {
        type: DataTypes.INTEGER,
        field: "skill_id",
        references: {
          model: "Skill",
          key: "id",
        },
      },
    },
    {
      tableName: "profile_skills",
    }
  );

  return ProfileSkill;
};
