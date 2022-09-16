import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import CardPlace from '../CardPlace/CardPlace.jsx';
import avatar from './images/avatar.png';
import './UserPage.css';

import { loadPerson, loadPersonPlaces, disablePerson } from '../../store/usersSlice/usersSlice';
import Loader from '../Loader/Loader.jsx';

function UserPage() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const user = useSelector((state) => state.user.data);
  const { personInfo, personPlaces, personLoaded } = useSelector((state) => state.users);
  const { login } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadPerson({ login }));
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
    dispatch(loadPersonPlaces({ personId: personInfo.id }));
  }, [navigate, dispatch, personLoaded, personInfo]);

  if (personLoaded === null) {
    return (
      <Loader />
    );
  }

  return (
    <div className='profile_container'>
      <div className="profile_content">
        <div className='backbtn font_button_small'><NavLink onClick={() => navigate('/')} to='/'>← На главную</NavLink></div>
        <div className='profile'>
          <div className='user_info'>
            {personLoaded
              && personInfo.photo
              && <img src={personInfo.photo} alt="фото" className="user_photo"/>}
            { personLoaded && !personInfo.photo && <img src={avatar} alt="фото" className="user_photo"/>}

            { personLoaded
              && isUser
              && personInfo.login === user.login
              ? <div className='user_name'><h5>{user.displayName}</h5></div>
              : <div className='user_name'><h5>{personInfo.displayName}</h5></div>
            }
            { personLoaded
              && isUser
              && personInfo.login !== user.login
              && personInfo.tgUsername
              && <button className='tg_btn'>
                <a href={`${personInfo.tgUsername}`} target="_blank" rel="noreferrer">Написать</a>
              </button>
            }
          </div>
          <div className='user_data_profile'>
            {personLoaded
              && isUser
              && personInfo.login === user.login
              ? (
                <>
                <div className='data_profile_container'>
                  <h4 className='my_data'>Мои данные</h4>
                  <NavLink className='edit_btn font_button' to="/settings">Редактировать ✐</NavLink>
                </div>
                <div className='details font_body'>Логин: {personLoaded && personInfo.login}</div>
                <div className='details font_body'>Почта: {personLoaded && user.email}</div>
                <div className='details font_body'>Город: {personLoaded && personInfo.city}</div>
                </>
              )
              : (
                <>
                <div className='data_profile_container'>
                  <h4 className='my_data'>Данные пользователя</h4>
                </div>
                <div className='details font_body'>Логин: {personLoaded && personInfo.login}</div>
                <div className='details font_body'>Город: {personLoaded && personInfo.city}</div>
                </>
              )
              }
            {
              personLoaded && personInfo.sex
                ? <div className='details font_body'>Пол: {personInfo.sex}</div>
                : <div className='details'>Пол: не указан</div>
            }
            {
              personLoaded && personInfo.age
                ? <div className='details font_body'>Возраст: {personInfo.age}</div>
                : <div className='details font_body'>Возраст: не указан</div>
            }
            {
              personLoaded && personInfo.about
                ? <div className='details font_body'>Обо мне: {personInfo.about}</div>
                : <div className='details font_body'>Обо мне: не указано</div>
            }
          </div>
        </div>
        <div className='places'>
          <div className='my_places'>
          {personLoaded
              && isUser
              && personInfo.login === user.login
            ? (
              <div className='my_places_headers'>
                <h3>Мои места</h3>
                <NavLink to="/newplace" className='font_button' >Добавить место +</NavLink>
              </div>
            )
            : (
              <div className='my_places_headers'>
                <h3>Места пользователя</h3>
              </div>
            )
            }
            <div className='cards flex_container'>
              {personLoaded
                && personPlaces.length
                ? personPlaces.map((place) => <CardPlace key={place.id} place={place} />)
                : <p>Пока не добавлено ни одного места</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
