import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadPlace, loadPlaceTags } from '../../store/placeSlice/placeSlice';
import Map from '../Map/Map.jsx';
import Comment from '../Comment/Comment.jsx';
import './PlacePage.css';
import AddComment from '../AddComment/AddComent.jsx';
import { loadComments } from '../../store/commentSlice.js/commentSlice';

function PlacePage() {
  const [isShow, setShow] = useState(false);
  const comments = useSelector((state) => state.comments.data);

  const { id } = useParams();
  const dispatch = useDispatch();
  const place = useSelector((state) => state.place.data);

  function handleClick() {
    setShow(true);
  }

  useEffect(() => {
    dispatch(loadPlace(Number(id)));
    dispatch(loadPlaceTags(Number(id)));
    dispatch(loadComments(id));
  }, [dispatch, id]);

  return (
    <div className='content_container'>
      <div className='place_container'>
        <div className='place_container_left'>
          <div className='place_container_image'>
            { place
              && place.PlaceImages
              && <img
                className="big_place_image"
                src={place.PlaceImages[0].src}
                alt={place.PlaceImages[0].title}
              />
            }
          </div>
          <div className='above_place_image'>
            {
              place
                && place.PlaceImages
                && place.PlaceImages.map((image) => (
                  <div key={image.id} className='place_image_small'>
                    <img
                      className="small_place_image"
                      src={image.src}
                      alt={image.title}
                    />
                  </div>
                ))
            }
          </div>
          <span className='place_left_location font_subheading_small'>МЕСТОПОЛОЖЕНИЕ :</span>
          <div className='place_location_text font_body_small'>
            <p>Адрес: {place.adress}</p>
          </div>
        </div>
        <div className='place_container_right'>
          <h4>
            {place.title}
          </h4>
          <div>
            <span className='font_subheading_small'>ОПИСАНИЕ :</span>
            <p className='place_description font_body_small' style={{ lineHeight: '26px' }}>
              {place.description}
            </p>
          </div>
          <div>
            <span className='font_subheading_small'>ТЭГ :
            </span>
            {
              place.PlaceTags
              && place.PlaceTags.length
              && place.PlaceTags.map((placeTag) => (
                <p key={placeTag.Tag.id}>{placeTag.Tag.title}</p>
              ))
            }
            <span className='font_subheading_small'> Категории :
            </span>
            { place
              && place.Category
              && <p>{place.Category.title}</p>
            }
          </div>
        </div>
      </div>
      <div className='place_map'>
              {
                place.longitude
                && <Map place={place} />
              }
            </div>
            <div className='place_comments'>
              {comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
              <button type='click' onClick={handleClick} className='add_comment_btn'>Добавить комментарий</button>
            </div>
            {isShow && <AddComment />}
    </div>
  );
}

export default PlacePage;
