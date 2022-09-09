/* eslint-disable no-undef */
window.addEventListener('load', async () => {
  ymaps.ready(() => {
    const myMap = new ymaps.Map('YMapsID', {
      center: [59.94, 30.32],
      zoom: 10,
      controls: ['routeButtonControl'],
    });

    const myPlacemark = new ymaps.Placemark([59.94, 30.32], {}, {
      preset: 'islands#redIcon',
    });

    myMap.geoObjects.add(myPlacemark);
  });
});
/* eslint-enable no-undef */
