module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('PlacesToGo', [{
      placeId: 5,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 6,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 2,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 3,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PlacesToGo', null, {});
  },
};
