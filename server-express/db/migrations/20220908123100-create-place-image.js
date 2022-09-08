module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlaceImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      src: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      placeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Places',
          key: 'id',
        },
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('PlaceImages');
  },
};
