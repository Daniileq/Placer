import { useSelector } from 'react-redux';
import './CardPlace.css';
import { useNavigate } from 'react-router-dom';
import PlaceToGoButton from '../PlaceToGoButton/PlaceToGoButton.jsx';
import LikeButton from '../LikeButton/LikeButton.jsx';

function CardPlace({ place }) {
  const navigate = useNavigate();
  const isUser = useSelector((state) => state.user.isUser);
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
      <div className='card_place_content'>
      <div className='card_place_buttons'>
        {isUser
          ? <>
              <LikeButton place={place} />
              <PlaceToGoButton place={place} />
            </>
          : <>
              <p className='popularity_info'>Любимое место: {place.Likes.length}</p>
              <p className='popularity_info'>Хочет пойти: {place.PlaceToGos.length}</p>
            </>
          }
        </div>
        <h4 className="card_place_title">
          {place.title}
        </h4>
        <h5 className='font_subheading'>{place.address}</h5>

        <div className='card_place_tags font_caption_small'>
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
        <div className='card_place_more'>
          <button className="more_button font_button" onClick={() => navigate(`/places/${place.id}`)}>Подробнее</button>
        </div>
      </div>
    </div>
  );
}

export default CardPlace;
