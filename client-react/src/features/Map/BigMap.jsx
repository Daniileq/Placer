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
    ymaps.ready(() => {
      myMap = new ymaps.Map('YMapsID', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['routeButtonControl'],
      });

      placesCoords.map((placeCoords) => {
        const myPlacemark = new ymaps.Placemark(placeCoords, {}, {
          preset: 'islands#blueIcon',
        });
        myPlacemark.events.add('click', () => {
          const cords = myPlacemark.geometry._coordinates.map((coord) => Number(coord));
          const currPl = places.find((pl) => pl.longitude === cords[0] && pl.latitude === cords[1]);
          navigate(`/places/${currPl.id}`);
        });
        return myMap.geoObjects.add(myPlacemark);
      });
    });

    return () => {
      myMap.destroy();
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
