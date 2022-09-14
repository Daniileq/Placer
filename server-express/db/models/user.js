const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Place, Message, Like, Comment, EventToGo, PlaceToGo,
    }) {
      User.Places = User.hasMany(Place, {
        foreignKey: 'userId',
      });

      User.MesssageAuthor = User.hasMany(Message, {
        foreignKey: 'authorId',
      });

      User.MesssageRecepient = User.hasMany(Message, {
        foreignKey: 'recipientId',
      });

      User.Likes = User.hasMany(Like, {
        foreignKey: 'userId',
      });

      User.Comments = User.hasMany(Comment, {
        foreignKey: 'userId',
      });

      User.PlacesToGo = User.hasMany(PlaceToGo, {
        foreignKey: 'userId',
      });

      User.EventsToGo = User.hasMany(EventToGo, {
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
      type: DataTypes.TEXT,
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
    tgUsername: {
      type: DataTypes.TEXT,
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
