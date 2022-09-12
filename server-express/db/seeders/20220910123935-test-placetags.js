module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('PlaceTags', [{
      placeId: 1,
      tagId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 1,
      tagId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 1,
      tagId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 2,
      tagId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 2,
      tagId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 2,
      tagId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 3,
      tagId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 3,
      tagId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 4,
      tagId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 4,
      tagId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 5,
      tagId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 5,
      tagId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 6,
      tagId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      placeId: 6,
      tagId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PlaceTags', null, {});
  },
};
