const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate({ PlaceTag }) {
      Tag.PlaceTags = Tag.hasMany(PlaceTag, {
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

  Tag.init(attributes, {
    sequelize,
    modelName: 'Tag',
    tableName: 'Tags',
  });

  return Tag;
};
