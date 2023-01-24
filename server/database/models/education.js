"use strict";

module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define(
    "Education",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      specialty: DataTypes.STRING,
      startDate: {
        type: DataTypes.STRING,
        field: "start_date",
      },
      endDate: {
        type: DataTypes.STRING,
        field: "end_date",
      },
      university: DataTypes.STRING,
    },
    {
      tableName: "educations",
    }
  );

  Education.associate = function (models) {
    Education.belongsTo(models.Profile, {
      as: "profiles",
      foreignKey: "profile_id",
      targetKey: "id",
    });
    Education.belongsTo(models.Major, {
      as: "majors",
      foreignKey: "major_id",
      targetKey: "id",
    });
    Education.belongsTo(models.Diploma, {
      as: "diplomas",
      foreignKey: "diploma_id",
      targetKey: "id",
    });
  };
  Education.gqlNames = ["Education", "Educations"];

  return Education;
};
