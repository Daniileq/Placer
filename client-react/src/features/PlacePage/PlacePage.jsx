import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlace } from '../../store/placeSlice/placeSlice';

import Map from '../Map/Map.jsx';
import Comment from '../Comment/Comment.jsx';
import './PlacePage.css';
import AddComment from '../AddComment/AddComent.jsx';
import { loadComments } from '../../store/commentSlice.js/commentSlice';
import ImageSwiper from '../ImageSwiper/ImageSwiper.jsx';
import { loadUserLoginsToGo } from '../../store/usersSlice/usersSlice';

function PlacePage() {
  // const [isShow, setShow] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginsToGo = useSelector((state) => state.users.userLoginsToGo);
  const comments = useSelector((state) => state.comments.data);
  const place = useSelector((state) => state.place.data);
  const [img, setImg] = useState(null);

  useEffect(() => {
    dispatch(loadPlace(Number(id)));
    dispatch(loadComments(id));
    dispatch(loadUserLoginsToGo({ placeId: id }));
  }, [dispatch, id]);

  return (
    <div className='content_container'>
      <div className='place_container'>
        <div className='place_container_left'>
          <div className='place_container_image'>
            {img
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
                  src={place.PlaceImages.length && place.PlaceImages[0].src}
                  alt={place.PlaceImages.length && place.PlaceImages[0].title}
                />
              )
            }
          </div>
          <div className='above_place_image'>
            {
              place.PlaceImages
              && <ImageSwiper images={place.PlaceImages} img={img} setImg={setImg} />
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
            {place
              && place.Category
              && <p>{place.Category.title}</p>
            }
          </div>
          <div>
            <span className='font_subheading_small'> Кто собирается пойти :
              {userLoginsToGo.map((login) => <Link key={login} to={`/${login}`}>{login}</Link>)}
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
        <h3>Комментарии</h3>
        <div>
          {comments.length === 0 ? <p className='font_caption_small'>Нет комментариев</p> : <p className='font_caption_small'>{comments.length} комментариев</p>}
        </div>
        {
          <div>
            {comments.map((comment) => <Comment key={comment.id} comment={comment} place={place}/>)}
          </div>
        }
        <div>
          <AddComment />
        </div>
        {/* {!isShow
            && <button type='click' onClick={() => setShow(true)} className='add_comment_btn'>
            </button>
        } */}
        {/* {isShow && <AddComment />} */}
      </div>
      <button className='edit_place_btn' type="submit" onClick={() => navigate('edit')}>Редактировать</button>
      <ImageSwiper />
    </div>
  );
}

export default PlacePage;
