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
    }, {
      placeId: 1,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 2,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 3,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 4,
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 5,
      userId: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 6,
      userId: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 7,
      userId: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 8,
      userId: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 9,
      userId: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 10,
      userId: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 11,
      userId: 13,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 12,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 13,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 2,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 14,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 15,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 16,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 17,
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 18,
      userId: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 19,
      userId: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 20,
      userId: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 21,
      userId: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 22,
      userId: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 23,
      userId: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 24,
      userId: 13,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 25,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 26,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 27,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 28,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 29,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 30,
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PlacesToGo', null, {});
  },
};
