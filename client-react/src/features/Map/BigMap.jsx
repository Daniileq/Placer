/* eslint-disable no-undef */
import React, { useEffect } from 'react';

function BigMap({ placesCoords }) {
  useEffect(() => {
    // const places = [[59.94, 30.32], [59.94, 30.32], [59.90, 30.30]];
    ymaps.ready(() => {
      const myMap = new ymaps.Map('YMapsID', {
        center: [59.94, 30.32],
        zoom: 10,
        controls: ['routeButtonControl'],
      });

      placesCoords.map((placeCoords) => {
        const myPlacemark = new ymaps.Placemark(placeCoords, {}, {
          preset: 'islands#blueIcon',
        });

        return myMap.geoObjects.add(myPlacemark);
      });
    });
  }, [placesCoords]);

  return (
    <div>
      <div id="YMapsID" style={{ width: `${650}px`, height: `${450}px` }}>
    </div>
    </div>
  );
}

export default BigMap;
/* eslint-enable no-undef */
