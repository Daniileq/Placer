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
      title: 'Можно с животными',
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
    }, {
      title: 'Лекции',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Открой новое',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Активный отдых',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Для свиданий',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'День рождения',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Шумная компания',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Умиротворение',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Веселая атмосфера',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Красивый вид',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Тихое место',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Инстаместо',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Для бабушек',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
