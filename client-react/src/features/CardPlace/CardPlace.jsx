import React from 'react';
import './CardPlace.css';
import LikeButton from '../LikeButton/LikeButton.jsx';

function CardPlace({ place }) {
  return (
    <div className='card_place'>
      <div className='card_place_image'>
        {
          place.PlaceImages
          && place.PlaceImages.length
          && <img
            src={place.PlaceImages[0].src}
            alt={place.PlaceImages[0].title}
          />
        }
      </div>
      <h4 className="card_place_title">{place.title}</h4>
      <div className='card_place_tags'>
        {place.PlaceTags && place.PlaceTags
          .map((placeTag) => (
            <div key={placeTag.Tag.id} className='card_place_tag'>
              {placeTag.Tag.title}
            </div>
          ))
        }
      </div>
      <p className="card_place_text">
        {place.description.length && place.description}
      </p>
      <LikeButton place={place} />
    </div>
  );
}

export default CardPlace;
