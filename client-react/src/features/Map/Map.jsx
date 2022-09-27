/* eslint-disable no-undef */
import React, { useEffect } from 'react';

function Map({ place }) {
  useEffect(() => {
    let myMap;
    ymaps.ready(() => {
      myMap = new ymaps.Map('YMapsID', {
        center: [place.longitude, place.latitude],
        zoom: 12,
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
      <div id="YMapsID" style={{ width: `${83}%`, height: `${450}px` }}>
      </div>
    </>
  );
}

export default Map;

/* eslint-enable no-undef */
