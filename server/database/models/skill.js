"use strict";

module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      developer: DataTypes.STRING,
    },
    {
      tableName: "skills",
    }
  );

  Skill.associate = function (models) {
    Skill.belongsToMany(models.Profile, {
      as: "profiles",
      through: { model: models.ProfileSkill },
      foreignKey: "skill_id",
    });
  };
  Skill.gqlNames = ["Skill", "Skills"];

  return Skill;
};
