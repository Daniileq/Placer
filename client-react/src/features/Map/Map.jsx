/* eslint-disable no-undef */
import React, { useEffect } from 'react';

function Map({ place }) {
  useEffect(() => {
    let myMap;
    ymaps.ready(() => {
      myMap = new ymaps.Map('YMapsID', {
        center: [59.94, 30.32],
        zoom: 10,
        controls: ['routeButtonControl'],
      });

      const myPlacemark = new ymaps.Placemark([place.longitude, place.latitude], {}, {
        preset: 'islands#blueIcon',
      });

      myMap.geoObjects.add(myPlacemark);
    });
    return () => {
      myMap.destroy();
    };
  }, [place.longitude, place.latitude]);

  return (
    <>
      <div id="YMapsID" style={{ width: `${450}px`, height: `${350}px` }}>
      </div>
    </>
  );
}

export default Map;

/* eslint-enable no-undef */
