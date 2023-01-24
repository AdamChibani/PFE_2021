"use strict";

module.exports = (sequelize, DataTypes) => {
  const Messagerie = sequelize.define(
    "Messagerie",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      subject: DataTypes.STRING,
      opened: DataTypes.BOOLEAN,
    },
    {
      tableName: "messageries",
    }
  );

  Messagerie.associate = function (models) {
    Messagerie.belongsTo(models.User, {
      as: "sender",
      foreignKey: "sender_id",
      targetKey: "id",
    });
    Messagerie.belongsToMany(models.User, {
      as: "receiver",
      foreignKey: "messagerie_id",
      through: models.ReceiverMessagerie,
    });
    Messagerie.hasMany(models.Message, {
      as: "messages",
      foreignKey: "messagerie_id",
      targetKey: "id",
    });
  };
  Messagerie.gqlNames = ["Messagerie", "Messageries"];

  return Messagerie;
};
