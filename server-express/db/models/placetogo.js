const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlaceToGo extends Model {
    static associate({ User, Place }) {
      PlaceToGo.place = PlaceToGo.belongsTo(Place, {
        foreignKey: 'placeId',
      });

      PlaceToGo.user = PlaceToGo.belongsTo(User, {
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
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Places',
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

  PlaceToGo.init(attributes, {
    sequelize,
    modelName: 'PlaceToGo',
    tableName: 'PlacesToGo',
  });
  return PlaceToGo;
};
