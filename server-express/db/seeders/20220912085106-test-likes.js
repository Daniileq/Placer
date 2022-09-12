module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Likes', [{
      userId: 1,
      placeId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: 1,
      placeId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: 1,
      placeId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: 2,
      placeId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: 2,
      placeId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: 2,
      placeId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Likes', null, {});
  },
};
