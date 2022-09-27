import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardPlace from '../CardPlace/CardPlace.jsx';
import avatar from './images/avatar.png';
import './ProfilePage.css';

import { loadPerson, loadPersonPlaces, disablePerson } from '../../store/usersSlice/usersSlice';
import Loader from '../Loader/Loader.jsx';

function ProfilePage() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const user = useSelector((state) => state.user.data);
  const {
    personInfo,
    personPlaces,
    personLoaded,
    personPlacesLoaded,
  } = useSelector((state) => state.users);
  const { login } = useParams();
  const owner = isUser && user.login === login;
  const navigate = useNavigate();

  useEffect(() => {
    if (!owner) {
      dispatch(loadPerson({ login }));
    }
    return () => {
      dispatch(disablePerson());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  useEffect(() => {
    if (personLoaded === false) {
      navigate('/notfound');
      return;
    }
    if (owner) {
      dispatch(loadPersonPlaces({ personId: user.id }));
    }
    dispatch(loadPersonPlaces({ personId: personInfo.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personLoaded, personInfo, owner, user]);

  if (personLoaded === null && !owner) {
    return (
      <Loader />
    );
  }

  if (owner) {
    return (
      <div className='profile_container'>
        <div className="profile_content">
          <div className='backbtn font_button_small'>
            <div onClick={() => navigate(-1)}>
              ← Назад
            </div>
          </div>
          <div className='profile'>
            <div className='user_info'>
              <div className='user_photo_wrapper'>
                {user.photo
                  ? <img src={user.photo} alt="фото" className="user_photo" />
                  : <img src={avatar} alt="фото" className="user_photo" />}
              </div>
              <p className='user_name' title={user.displayName}>
                {user.displayName}
              </p>
            </div>
            <div className='user_data_profile'>
              <div className='data_profile_container'>
                <h4 className='my_data'>Мои данные</h4>
                <Link className='edit_btn font_button' to="/settings">
                  Редактировать ✐
                </Link>
              </div>
              <div className='details font_body'>
                Логин: {user.login}
              </div>
              <div className='details font_body'>
                Почта: {user.email}
              </div>
              <div className='details font_body'>
                Город: {user.city}
              </div>
              <div className='details font_body'>
                Пол: {user.sex || 'не указан'}
              </div>
              <div className='details font_body'>
                Возраст: {user.age || 'не указан'}
              </div>
              <div className='details font_body'>
                Обо мне: {personInfo.about || 'не указано'}
              </div>
            </div>
          </div>
          <div className='places'>
            <div className='my_places'>
              <div className='my_places_headers'>
                <h3>Мои места</h3>
                <Link to="/newplace" className='font_button' >
                  Добавить место +
                </Link>
              </div>
              {personPlacesLoaded
                ? (
                  <div className='cards flex_container'>
                    {personPlaces.length
                      && personPlaces.map((place) => (
                        <CardPlace key={place.id} place={place} />
                      ))
                    }
                    {!personPlaces.length
                      && <p>Пока не добавлено ни одного места</p>
                    }
                  </div>
                )
                : <Loader />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='profile_container'>
      <div className="profile_content">
        <div className='backbtn font_button_small'>
          <div onClick={() => navigate(-1)}>
            ← Назад
          </div>
        </div>
        <div className='profile'>
          <div className='user_info'>
            <div className='user_photo_wrapper'>
              {personInfo.photo
                ? <img src={personInfo.photo} alt="фото" className="user_photo" />
                : <img src={avatar} alt="фото" className="user_photo" />}
            </div>
            <p className='user_name' title={personInfo.displayName}>
              {personInfo.displayName}
            </p>
            {isUser
              && personInfo.tgUsername
              && <button className='tg_btn'>
                <a
                  href={`${personInfo.tgUsername}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Написать
                </a>
              </button>
            }
          </div>
          <div className='user_data_profile'>
            <div className='data_profile_container'>
              <h4 className='my_data'>Данные пользователя</h4>
            </div>
            <div className='details font_body'>
              Логин: {personInfo.login}
            </div>
            <div className='details font_body'>
              Город: {personInfo.city}
            </div>
            <div className='details font_body'>
              Пол: {personInfo.sex || 'не указан'}
            </div>
            <div className='details font_body'>
              Возраст: {personInfo.age || 'не указан'}
            </div>
            <div className='details font_body'>
              Обо мне: {personInfo.about || 'не указано'}
            </div>
          </div>
        </div>
        <div className='places'>
          <div className='my_places'>
            <div className='my_places_headers'>
              <h3>Места пользователя</h3>
            </div>
            {personPlacesLoaded
              ? (
                <div className='cards flex_container'>
                  {personPlaces.length
                    && personPlaces.map((place) => (
                      <CardPlace key={place.id} place={place} />
                    ))
                  }
                  {!personPlaces.length
                    && <p>Пока не добавлено ни одного места</p>
                  }
                </div>
              )
              : <Loader />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
