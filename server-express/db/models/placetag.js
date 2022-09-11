const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlaceTag extends Model {
    static associate({ Tag, Place }) {
      PlaceTag.Place = PlaceTag.belongsTo(Place, {
        foreignKey: 'placeId',
      });

      PlaceTag.Tag = PlaceTag.belongsTo(Tag, {
        foreignKey: 'tagId',
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
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tags',
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

  PlaceTag.init(attributes, {
    sequelize,
    modelName: 'PlaceTag',
    tableName: 'PlaceTags',
  });
  return PlaceTag;
};
