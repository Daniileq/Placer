const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventToGo extends Model {
    static associate({ Event, User }) {
      EventToGo.Event = EventToGo.belongsTo(Event, {
        foreignKey: 'eventId',
      });

      EventToGo.User = EventToGo.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  };

  EventToGo.init(attributes, {
    sequelize,
    modelName: 'EventToGo',
    tableName: 'EventsToGo',
  });
  return EventToGo;
};
