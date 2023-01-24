"use strict";

module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define(
    "Experience",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      jobTitle: { type: DataTypes.STRING, field: "job_title" },
      description: DataTypes.STRING,
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
      tableName: "experiences",
    }
  );

  Experience.associate = function (models) {
    Experience.belongsTo(models.Profile, {
      as: "experiences",
      foreignKey: "profile_id",
      targetKey: "id",
    });
  };
  Experience.gqlNames = ["Experience", "Experiences"];

  return Experience;
};
