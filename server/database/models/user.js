"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
      },
      gender: DataTypes.STRING,
      password: DataTypes.STRING,
      profileImage: {
        type: DataTypes.STRING,
        field: "profile_image",
      },
      language: {
        type: DataTypes.STRING(8),
        defaultValue: "fr-CA",
        allowNull: true,
      },
      direction: {
        type: DataTypes.STRING(3),
        defaultValue: null,
        allowNull: true,
      },
      post: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      lastIp: {
        type: DataTypes.STRING(128),
        field: "last_ip",
      },
      lastLogin: {
        type: DataTypes.DATE,
        field: "last_login",
      },
      lastPasswordChange: {
        type: DataTypes.DATE,
        field: "last_password_change",
      },
      isEnterPriseAdmin: {
        type: DataTypes.BOOLEAN,
        field: "is_enterprise_admin",
      },
    },
    {
      tableName: "users",
    }
  );

  User.associate = function (models) {
    User.hasOne(models.Profile, {
      as: "profile",
      foreignKey: "user_id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
    User.belongsTo(models.Company, {
      as: "company",
      foreignKey: "company_id",
      targetKey: "id",
    });
    User.hasMany(models.Messagerie, {
      as: "sender",
      foreignKey: "sender_id",
      targetKey: "id",
    });
    User.hasMany(models.Message, {
      as: "author",
      foreignKey: "sender_id",
      targetKey: "id",
    });

    User.belongsToMany(models.Messagerie, {
      as: "receiver",
      foreignKey: "receiver_id",
      through: models.ReceiverMessagerie,
    });
    User.belongsTo(models.UsersRole, {
      as: "role",
      foreignKey: "role_id",
      targetKey: "id",
    });
  };
  User.gqlNames = ["User", "Users", "Receiver", "Sender", "Author"];

  return User;
};
