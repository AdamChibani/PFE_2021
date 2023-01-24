"use strict";

module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define(
    "State",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: "states",
    }
  );

  State.associate = function (models) {
    State.hasMany(models.Company, {
      as: "states",
      foreignKey: "state_id",
      targetKey: "id",
    });
  };
  State.gqlNames = ["State", "States"];

  return State;
};
