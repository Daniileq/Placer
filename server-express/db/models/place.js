const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate({
      User, Category, Event, Like, Comment, PlaceToGo, PlaceTag, PlaceImage,
    }) {
      Place.User = Place.belongsTo(User, {
        foreignKey: 'userId',
      });

      Place.Category = Place.belongsTo(Category, {
        foreignKey: 'categoryId',
      });

      Place.Events = Place.hasMany(Event, {
        foreignKey: 'placeId',
      });

      Place.Tags = Place.hasMany(PlaceTag, {
        foreignKey: 'placeId',
      });

      Place.PlaceImages = Place.hasMany(PlaceImage, {
        foreignKey: 'placeId',
      });

      Place.Likes = Place.hasMany(Like, {
        foreignKey: 'placeId',
      });

      Place.Comments = Place.hasMany(Comment, {
        foreignKey: 'placeId',
      });

      Place.PlaceToGos = Place.hasMany(PlaceToGo, {
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
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
