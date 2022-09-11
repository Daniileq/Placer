const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const password = bcrypt.hash('qwerty12345', 10);
    await queryInterface.bulkInsert('Users', [{
      email: 'vitalya@italy.it',
      login: 'Виталя',
      displayName: 'Vetal',
      password,
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png',
      age: 28,
      sex: 'M',
      city: 'Санкт-Петербург',
      about: 'Топовый developer',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      email: 'lexa@gmail.com',
      login: 'Алексей',
      displayName: 'Лёха',
      password,
      photo: 'https://memepedia.ru/wp-content/uploads/2017/08/%D0%B3%D0%B4%D0%B5-%D0%BB%D0%B5%D1%85%D0%B0-2.jpg',
      age: 30,
      sex: 'M',
      city: 'Санкт-Петербург',
      about: 'Админ этого сайта',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
