import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadPlace, loadPlaceTags } from '../../store/placeSlice/placeSlice';
import Map from '../Map/Map.jsx';
import Comment from '../Comment/Comment.jsx';
import './PlacePage.css';
import AddComment from '../AddComment/AddComent.jsx';
import { loadComments } from '../../store/commentSlice.js/commentSlice';
import ImageSwiper from '../ImageSwiper/ImageSwiper.jsx';
import { loadUserLoginsToGo } from '../../store/usersSlice/usersSlice';

function PlacePage() {
  const [isShow, setShow] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const userLoginsToGo = useSelector((state) => state.users.userLoginsToGo);
  const comments = useSelector((state) => state.comments.data);
  const place = useSelector((state) => state.place.data);
  const [img, setImg] = useState(null);

  useEffect(() => {
    dispatch(loadPlace(Number(id)));
    dispatch(loadPlaceTags(Number(id)));
    dispatch(loadComments(id));
    dispatch(loadUserLoginsToGo({ placeId: id }));
  }, [dispatch, id]);

  return (
    <div className='content_container'>
      <div className='place_container'>
        <div className='place_container_left'>
          <div className='place_container_image'>
            { img
              ? (
                <img
                  className="big_place_image"
                  src={img.src}
                  alt={img.title}
                />
              )
              : (
                place.PlaceImages
                  && <img
                    className="big_place_image"
                    src={place.PlaceImages[0].src}
                    alt={place.PlaceImages[0].title}
                  />
              )
            }
          </div>
          <div className='above_place_image'>
            {
              place.PlaceImages
                && <ImageSwiper images={place.PlaceImages} img={img} setImg={setImg}/>
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
          <div>
            <span className='font_subheading_small'> Кто собирается пойти :
            {userLoginsToGo.map((login) => <p>{login}</p>)}
            </span>
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
              {!isShow
                && <button type='click' onClick={() => setShow(true)} className='add_comment_btn'>Добавить комментарий</button>
              }
            </div>
              {isShow && <AddComment />}
              <ImageSwiper />
    </div>
  );
}

export default PlacePage;
