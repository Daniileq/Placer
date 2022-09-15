/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './BigMap.css';

function BigMap() {
  const { keywordPlaces: places } = useSelector((state) => state.search);
  const navigate = useNavigate();

  const placesCoords = useMemo(() => (
    places.length
      ? places
        .map((place) => {
          const arr = [];
          arr.push(place.longitude, place.latitude);
          return arr;
        })
      : 'all'
  ), [places]);

  useEffect(() => {
    let myMap;
    const openPlaceFuncs = {};
    ymaps.ready(() => {
      myMap = new ymaps.Map('YMapsID', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['routeButtonControl'],
      });

      placesCoords.map((placeCoords) => {
        const place = places.find(
          (pl) => pl.longitude === placeCoords[0] && pl.latitude === placeCoords[1],
        );
        const myPlacemark = new ymaps.Placemark(placeCoords, {
          preset: 'islands#blueIcon',
          balloonContentHeader: `<p>${place && place.title}</p><br>`,
          balloonContentBody: `<img src=${place && place.PlaceImages[0] && place.PlaceImages[0].src} height="150" width="200"> <br/> `
          + `<button class="openPlace${place.id}">Подробнее<button /> <br/>`,
          balloonContentFooter: `${place.adress}`,
          hintContent: `${place.adress}`,
        });

        const openPlaceFunc = (event) => {
          if (event.target.classList.contains(`openPlace${place.id}`)) {
            navigate(`/places/${place.id}`);
          }
        };

        openPlaceFuncs[`${place.id}`] = openPlaceFunc;

        myPlacemark.events.add('click', () => {
          myPlacemark.balloon.open();
        });
        document.addEventListener(
          'click',
          openPlaceFunc,
        );
        return myMap.geoObjects.add(myPlacemark);
      });
    });

    return () => {
      myMap.destroy();
      places.forEach((place) => {
        document.removeEventListener(
          'click',
          openPlaceFuncs[`${place.id}`],
        );
      });
    };
  }, [placesCoords, places, navigate]);

  return (
    <div>
      <div className='big_map'id="YMapsID"></div>
    </div>
  );
}

export default BigMap;
/* eslint-ensable no-underscore-dangle */
/* eslint-enable no-undef */
