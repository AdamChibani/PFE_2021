"use strict";

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      projectTitle: {
        type: DataTypes.STRING,
        field: "project_title",
      },
      jobTitle: { type: DataTypes.STRING, field: "job_title" },
      scope: DataTypes.STRING,
      startDate: { type: DataTypes.STRING, field: "start_date" },
      endDate: { type: DataTypes.STRING, field: "end_date" },
      employer: DataTypes.STRING,
      company: DataTypes.STRING,
      poFirstName: { type: DataTypes.STRING, field: "po_first_name" },
      poLastName: { type: DataTypes.STRING, field: "po_last_name" },
      poEmail: { type: DataTypes.STRING, field: "po_email" },
      poPhoneNumber: { type: DataTypes.INTEGER, field: "po_phone_number" },
      poPosition: { type: DataTypes.STRING, field: "po_position" },
    },
    {
      tableName: "projects",
    }
  );

  Project.associate = function (models) {
    Project.belongsTo(models.Profile, {
      as: "projects",
      foreignKey: "profile_id",
      targetKey: "id",
    });
  };
  Project.gqlNames = ["Project", "Projects"];

  return Project;
};
