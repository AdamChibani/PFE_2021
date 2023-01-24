"use strict";

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      content: DataTypes.STRING,
      messagerieId: { type: DataTypes.INTEGER, field: "messagerie_id" },
      authorId: { type: DataTypes.INTEGER, field: "sender_id" },
    },

    {
      tableName: "messages",
    }
  );

  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      as: "sender",
      foreignKey: "sender_id",
      targetKey: "id",
    });
    Message.belongsTo(models.Messagerie, {
      as: "messagerie",
      foreignKey: "messagerie_id",
      targetKey: "id",
    });
  };
  Message.gqlNames = ["Message", "Messages"];

  return Message;
};
