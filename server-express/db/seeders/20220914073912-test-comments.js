module.exports = {
  async up(queryInterface) {
    const comments = [{
      content: 'Мне норм',
      userId: 1,
      placeId: 1,
    }, {
      content: 'Сходили в это место, очень понравилось',
      userId: 1,
      placeId: 2,
    },
    {
      content: 'Я был там. А ты?',
      userId: 2,
      placeId: 1,
    },
    {
      content: 'Прекрасное место, приду сюда ещё раз. Если будет такая возможность.',
      userId: 2,
      placeId: 2,
    },
    {
      content: 'Скукота...для бабушек))ну а так,чисто и красиво конечно',
      userId: 2,
      placeId: 3,
    },
    ];
    const commentsIn = comments.map((comment) => ({
      ...comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Comments', commentsIn);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Comments');
  },
};
