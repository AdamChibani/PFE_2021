"use strict";

module.exports = (sequelize, DataTypes) => {
  const ReceiverMessagerie = sequelize.define(
    "ReceiverMessagerie",
    {
      //   id: {
      //     type: DataTypes.INTEGER(11).UNSIGNED,
      //     primaryKey: true,
      //     allowNull: false,
      //     autoIncrement: true,
      //   },
      receiverId: {
        type: DataTypes.INTEGER,
        field: "receiver_id",
        references: {
          model: "User",
          key: "id",
        },
      },
      messagerieId: {
        type: DataTypes.INTEGER,
        field: "messagerie_id",
        references: {
          model: "Messagerie",
          key: "id",
        },
      },
    },
    {
      tableName: "receiver_messagerie",
    }
  );

  return ReceiverMessagerie;
};
