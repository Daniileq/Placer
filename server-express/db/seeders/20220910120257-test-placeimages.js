module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('PlaceImages', [{
      src: 'https://avatars.mds.yandex.net/get-altay/248099/2a0000015c20ec2d9efb5840692e959f1498/XXXL',
      placeId: 1,
      title: 'Фото 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/4379646/2a0000017c50d8aee900a9185ea078ea96c9/XXXL',
      placeId: 1,
      title: 'Фото 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/4667561/2a000001796edf2aa30cc7ab17b71f258576/XXXL',
      placeId: 1,
      title: 'Фото 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/5533948/2a0000017d2955ace0a10de8f51c10f41c5c/XXXL',
      placeId: 2,
      title: 'Фото 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/5469293/2a000001817dc3389328bbddecc948b9fe32/XXXL',
      placeId: 2,
      title: 'Фото 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/5257938/2a0000017c46ee4e902dc1a69b5b763dc4e1/XXXL',
      placeId: 2,
      title: 'Фото 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/239474/2a0000015ed07aff332bbf1ed22c42314db0/XXXL',
      placeId: 3,
      title: 'Фото 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/474904/2a0000015ed07b6e44145a6f5ed2d0906a88/XXXL',
      placeId: 3,
      title: 'Фото 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/5457543/2a0000017d68446f605b516e6f22356215e5/XXXL',
      placeId: 3,
      title: 'Фото 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/1784631/2a0000016ad51fd478489d212def53d04298/XXXL',
      placeId: 4,
      title: 'Фото 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/1546430/2a0000016c1f668c721327344d15ff1d3708/XXXL',
      placeId: 4,
      title: 'Фото 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/2134557/2a0000016c1f668b591b414e9a52af5634ed/XXXL',
      placeId: 4,
      title: 'Фото 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/1871297/2a0000016ae3077091a9d4f19d480f3f027f/XXXL',
      placeId: 5,
      title: 'Фото 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/878647/2a00000162873edbe2a91d1f6afa0d718b5e/XXXL',
      placeId: 5,
      title: 'Фото 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/1007082/2a00000162873ed4e38bb32ae3c0419513be/XXXL',
      placeId: 5,
      title: 'Фото 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/1886119/2a0000016ae327dbf6978fb60a10f1770010/XXXL',
      placeId: 6,
      title: 'Фото 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/1020917/2a00000162876feb19008eb2bfbb7046f5ad/XXXL',
      placeId: 6,
      title: 'Фото 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      src: 'https://avatars.mds.yandex.net/get-altay/1775373/2a0000016ae327bea19386c761d9e782978c/XXXL',
      placeId: 6,
      title: 'Фото 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PlaceImages', null, {});
  },
};
