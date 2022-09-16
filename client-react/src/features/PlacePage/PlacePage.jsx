import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { disablePlace, loadPlace } from '../../store/placeSlice/placeSlice';

import Map from '../Map/Map.jsx';
import Comment from '../Comment/Comment.jsx';
import './PlacePage.css';
import AddComment from '../AddComment/AddComent.jsx';
import { loadComments } from '../../store/commentSlice.js/commentSlice';
import ImageSwiper from '../ImageSwiper/ImageSwiper.jsx';
import { loadUserLoginsToGo } from '../../store/usersSlice/usersSlice';
import Loader from '../Loader/Loader.jsx';

function PlacePage() {
  // const [isShow, setShow] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginsToGo = useSelector((state) => state.users.userLoginsToGo);
  const comments = useSelector((state) => state.comments.data);

  const { loading, data: place } = useSelector((state) => state.place);

  const isUser = useSelector((state) => state.user.isUser);
  const userId = useSelector((state) => state.user.data.id);

  const [img, setImg] = useState(null);

  useEffect(() => {
    dispatch(loadPlace(Number(id)));
    dispatch(loadComments(id));
    dispatch(loadUserLoginsToGo({ placeId: id }));
    return () => {
      dispatch(disablePlace());
    };
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='content_container'>
      <div className='place_container'>
        <div className='place_container_left'>
          <h4>
            {place.title}
          </h4>
          <div>
            <span className='font_subheading_small'>ОПИСАНИЕ :</span>
            <p className='place_description font_body_small' style={{ lineHeight: '26px' }}>
              {place.description}
            </p>
          </div>
          <div className='short_info_conteiner'>
            <div className='info_tags'>
              <span className='font_subheading_small'>Теги:
              </span>
              {
                place.PlaceTags
                && place.PlaceTags.length
                && place.PlaceTags.map((placeTag) => (
                  <p key={placeTag.Tag.id}>{placeTag.Tag.title}</p>
                ))
              }
            </div>
            <div className='info_category'>
              <span className='font_subheading_small'> Категория:
              </span>
              {place
                && place.Category
                && <p>{place.Category.title}</p>
              }
            </div>
          </div>
          <div>
            <span className='font_subheading_small'> Кто собирается пойти:
              {userLoginsToGo.map((login) => <Link key={login} to={`/${login}`} className='user_go' target="_blank">{' '}{login}</Link>)}
            </span>
          </div>
        </div>
        <div className='place_container_right'>
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
        </div>
      </div>
          <div className='place_location_text font_body_small'>
            <span className='place_left_location font_subheading_small'>МЕСТОПОЛОЖЕНИЕ :</span>
            {/* <p>Адрес: {place.adress}</p> */}
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
          {comments.length === 0 ? <p className='font_caption'>Нет комментариев</p> : <p className='font_caption'>{comments.length} комментария</p>}
        </div>
        {
          <div>
            {comments.map((comment) => <Comment key={comment.id} comment={comment} place={place}/>)}
          </div>
        }
        {isUser
          && (<div>
              <AddComment />
            </div>)
        }
        {/* {!isShow
            && <button type='click' onClick={() => setShow(true)} className='add_comment_btn'>
            </button>
        } */}
        {/* {isShow && <AddComment />} */}
      </div>
      {isUser && userId === place.userId
        ? (<div>
             <button className='edit_place_btn' type="submit" onClick={() => navigate('edit')}>Редактировать</button>
          </div>)
        : <></>
        }
      <ImageSwiper />
    </div>
  );
}

export default PlacePage;
