/* eslint-disable no-undef */
import React, { useEffect } from 'react';

function BigMap() {
  const places = [[59.94, 30.32], [59.94, 30.32], [59.90, 30.30]];
  useEffect(() => {
    ymaps.ready(() => {
      const myMap = new ymaps.Map('YMapsID', {
        center: [59.94, 30.32],
        zoom: 10,
        controls: ['routeButtonControl'],
      });

      places.map((place) => {
        const myPlacemark = new ymaps.Placemark(place, {}, {
          preset: 'islands#blueIcon',
        });

        return myMap.geoObjects.add(myPlacemark);
      });
    });
  }, []);

  return (
    <div>
      <div id="YMapsID" style={{ width: `${650}px`, height: `${450}px` }}>
    </div>
    </div>
  );
}

export default BigMap;
/* eslint-enable no-undef */
