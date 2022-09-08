const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate({
      User, Event, Like, Comment, PlaceToGo, PlaceTag, PlaceImage,
    }) {
      Place.user = Place.belongsTo(User, {
        foreignKey: 'userId',
      });

      Place.events = Place.hasMany(Event, {
        foreignKey: 'placeId',
      });

      Place.tags = Place.hasMany(PlaceTag, {
        foreignKey: 'placeId',
      });

      Place.images = Place.hasMany(PlaceImage, {
        foreignKey: 'placeId',
      });

      Place.likes = Place.hasMany(Like, {
        foreignKey: 'placeId',
      });

      Place.comments = Place.hasMany(Comment, {
        foreignKey: 'placeId',
      });

      Place.toGo = Place.hasMany(PlaceToGo, {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    adress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isModerated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
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

  Place.init(attributes, {
    sequelize,
    modelName: 'Place',
    tableName: 'Places',
  });
  return Place;
};
