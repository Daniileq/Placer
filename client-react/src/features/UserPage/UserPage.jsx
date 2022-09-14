import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import CardPlace from '../CardPlace/CardPlace.jsx';
import avatar from './images/avatar.png';
import './UserPage.css';

import { loadPerson, loadPersonPlaces } from '../../store/usersSlice/usersSlice';

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

    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (personLoaded === false) {
      navigate('*');
      return;
    }
    dispatch(loadPersonPlaces({ personId: personInfo.id }));
  }, [navigate, dispatch, personLoaded, personInfo]);

  return (
    <div className='profile_container'>
      <div className="profile_content">
        <div className='backbtn'><NavLink onClick={() => navigate('/')} to='/'>На главную</NavLink></div>
        <div className='profile'>
          <div className='user_info'>
            {personLoaded
              && personInfo.photo
              && <img src={personInfo.photo} alt="фото" className="user_photo"/>}
            { personLoaded && !personInfo.photo && <img src={avatar} alt="фото" className="user_photo"/>}
            <div className='user_name'>{user.displayName}</div>
          </div>
          <div className='user_data'>
            { isUser
              && personLoaded
              && personInfo.login === user.login
              ? <div className='my_data'>Мои данные</div>
              : <div className='my_data'>Данные пользователя:</div>}
            <div className='details'>Логин: {personLoaded && personInfo.login}</div>
            <div className='details'>Почта: {personLoaded && personInfo.email}</div>
            <div className='details'>Город: {personLoaded && personInfo.city}</div>
            {
              personLoaded && personInfo.sex
                ? <div className='details'>Пол: {personInfo.sex}</div>
                : <div className='details'>Пол: не указан</div>
            }
            {
              personLoaded && personInfo.age
                ? <div className='details'>Возраст: {personInfo.age}</div>
                : <div className='details'>Возраст: не указан</div>
            }
            {
              personLoaded && personInfo.about
                ? <div className='details'>Обо мне: {personInfo.about}</div>
                : <div className='details'>Обо мне: не указано</div>
            }
            <NavLink className='edit_btn' to="/settings">Редактировать</NavLink>
          </div>
        </div>
        <div className='places'>
          <div className='my_places'>
            <h3>Мои места</h3>
            <NavLink to="/newplace">Добавить место</NavLink>
            <div className='cards'>
              {personLoaded
              && personPlaces.length
              && personPlaces.map((place) => <CardPlace key={place.id} place={place}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
