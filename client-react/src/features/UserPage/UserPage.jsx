import React from 'react';
// import userSlice from '../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './UserPage.css';
import CardPlace from '../CardPlace/CardPlace.jsx';
import avatar from './images/avatar.png';

function UserPage() {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  return (
    <div className='profile_container'>
      <div className="profile_content">
        <div className='backbtn'><NavLink onClick={() => navigate('/')} to='/'>На главную</NavLink></div>
        <div className='profile'>
          <div className='user_info'>
            {user.photo && <img src={user.photo} alt="фото" className="user_photo"/>}
            {!user.photo && <img src={avatar} alt="фото" className="user_photo"/>}
            <div className='user_name'>{user.displayName}</div>
          </div>
          <div className='user_data'>
            <div className='my_data'>Мои данные</div>
            <div className='details'>Логин: {user.login}</div>
            <div className='details'>Почта: {user.email}</div>
            <div className='details'>Город: {user.city}</div>
            {
              user.sex
                ? <div className='details'>Пол: {user.sex}</div>
                : <div className='details'>Пол: не указан</div>
            }
            {
              user.age
                ? <div className='details'>Возраст: {user.age}</div>
                : <div className='details'>Возраст: не указан</div>
            }
            {
              user.about
                ? <div className='details'>Обо мне: {user.about}</div>
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
              {user.places
                && user.places.length
                && user.places.map((place) => <CardPlace place={place}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
