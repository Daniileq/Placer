module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [{
      title: 'Парки',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Кафе',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Театры',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
