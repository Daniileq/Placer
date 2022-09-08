const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Place, Message, Like, Comment, EventToGo, PlaceToGo,
    }) {
      User.places = User.hasMany(Place, {
        foreignKey: 'userId',
      });

      User.authMes = User.hasMany(Message, {
        foreignKey: 'authorId',
      });

      User.recMes = User.hasMany(Message, {
        foreignKey: 'recipientId',
      });

      User.likes = User.hasMany(Like, {
        foreignKey: 'userId',
      });

      User.comments = User.hasMany(Comment, {
        foreignKey: 'userId',
      });

      User.placesToGo = User.hasMany(PlaceToGo, {
        foreignKey: 'userId',
      });

      User.eventsToGo = User.hasMany(EventToGo, {
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
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isAdmin: {
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

  User.init(attributes, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};
