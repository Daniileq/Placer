import React, { useEffect } from 'react';

export default function AddPlaceOnMap({
  setLatitude, setLongitude, setAddress, initCoords,
}) {
  useEffect(() => {
    let myMap;
    console.log(initCoords);
    // eslint-disable-next-line no-undef
    ymaps.ready(() => {
      // eslint-disable-next-line no-undef
      myMap = new ymaps.Map(
        'map',
        {
          center: [59.94, 30.32],
          zoom: 9,
        },
        {
          searchControlProvider: 'yandex#search',
        },
      );

      if (initCoords) {
        // eslint-disable-next-line no-undef
        const initPlacemark = new ymaps.Placemark([initCoords[0], initCoords[1]], {}, {
          preset: 'islands#blueIcon',
        });

        myMap.geoObjects.add(initPlacemark);
      }

      // Слушаем клик на карте.
      myMap.events.add('click', (e) => {
        const coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.

        setLongitude(coords[0]);
        setLatitude(coords[1]);
        // eslint-disable-next-line no-undef
        const myPlacemark = new ymaps.Placemark(
          [coords[0], coords[1]],
          {},
          {
            preset: 'islands#blueIcon',
          },
        );
        if (myPlacemark) {
          myMap.geoObjects.removeAll();
        }
        myMap.geoObjects.add(myPlacemark);
        // eslint-disable-next-line no-undef
        ymaps.geocode(coords).then((res) => {
          const object = res.geoObjects.get(0);
          setAddress(object.getAddressLine());
        });
      });
    });
    return () => {
      myMap.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
        // onClick={(e) => mapClick(e)}
        id="map"
        style={{ width: `${450}px`, height: `${350}px` }}
      >
      </div>
  );
}
