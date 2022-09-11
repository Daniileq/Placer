module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tags', [{
      title: 'На природе',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Свежий воздух',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Можно с детьми',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Можно с домашними животными',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Всей семьей',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Культурный отдых',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
