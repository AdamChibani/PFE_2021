"use strict";

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      hourRate: { type: DataTypes.INTEGER, field: "hour_rate" },
      years: DataTypes.INTEGER,
      phone: DataTypes.INTEGER,
      isAgencyAdmin: {
        type: DataTypes.BOOLEAN,
        field: "is_agency_admin",
        defaultValue: false,
      },
      website: DataTypes.STRING,
      driversLicense: { type: DataTypes.STRING, field: "drivers_license" },
      clicks: DataTypes.INTEGER,
      state: DataTypes.INTEGER,
    },
    {
      tableName: "profiles",
    }
  );

  Profile.associate = function (models) {
    Profile.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
      targetKey: "id",
    });
    Profile.belongsToMany(models.Preference, {
      as: "preferences",
      foreignKey: "profile_id",
      through: models.ProfilePreference,
    });
    Profile.hasMany(models.Education, {
      as: "educations",
      foreignKey: "profile_id",
      targetKey: "id",
    });
    Profile.belongsTo(models.Nationality, {
      as: "nationalities",
      foreignKey: "nationality_id",
      targetKey: "id",
    });
    Profile.hasMany(models.Affiliation, {
      as: "affiliations",
      foreignKey: "profile_id",
      targetKey: "id",
    });
    Profile.hasMany(models.Language, {
      as: "languages",
      foreignKey: "profile_id",
      targetKey: "id",
    });
    Profile.hasMany(models.Experience, {
      as: "experiences",
      foreignKey: "profile_id",
      targetKey: "id",
    });
    Profile.hasMany(models.Project, {
      as: "projects",
      foreignKey: "profile_id",
      targetKey: "id",
    });

    Profile.belongsToMany(models.Skill, {
      as: "skills",
      through: models.ProfileSkill,
      foreignKey: "profile_id",
    });
    Profile.belongsToMany(models.Field, {
      as: "fields",
      through: models.ProfileField,
      foreignKey: "profile_id",
    });
    Profile.hasMany(models.Certification, {
      as: "certifications",
      foreignKey: "profile_id",
      targetKey: "id",
    });
  };
  Profile.gqlName = ["Profiles"];
  Profile.gqlNames = ["Profile", "profiles"];
  return Profile;
};
