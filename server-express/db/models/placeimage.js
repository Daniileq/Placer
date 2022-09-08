const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlaceImage extends Model {
    static associate({ Place }) {
      PlaceImage.place = PlaceImage.belongsTo(Place, {
        foreignKey: 'placeId',
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
    src: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Places',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
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

  PlaceImage.init(attributes, {
    sequelize,
    modelName: 'PlaceImage',
    tableName: 'PlaceImages',
  });
  return PlaceImage;
};
