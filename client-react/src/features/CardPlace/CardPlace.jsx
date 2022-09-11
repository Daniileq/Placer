import React from 'react';
import './CardPlace.css';

const CardPlace = ({ place }) => (
  <div className='cardPlace'>
    <div className='cardPlaceImage'>
      {
        place.PlaceImages
        && place.PlaceImages.length
        && <img
          src={place.PlaceImages[0].src}
          alt={place.PlaceImages[0].title}
        />
      }
    </div>
    <h4 className="cardPlaceTitle">{place.title}</h4>
    <div className='cardPlaceTags'>
      {place.PlaceTags && place.PlaceTags
        .map((placeTag) => (
          <div key={placeTag.Tag.id} className='cardPlaceTag'>
            {placeTag.Tag.title}
          </div>
        ))
      }
    </div>
    <p className="cardPlaceText">
      {place.description.length && place.description}
    </p>
  </div>
);

export default CardPlace;
