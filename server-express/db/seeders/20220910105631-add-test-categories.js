module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          title: 'Парки',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Кафе',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Театры',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Общественные пространства',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Благотоврительные организации',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Рестораны',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Образование',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Бары',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Музеи',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Торговые центры',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Спортивные объекты',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Концертные площадки',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Парки развлечений',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Религиозные объекты',
          createdAt: new Date(),
          updatedAt: new Date(),
        }],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
