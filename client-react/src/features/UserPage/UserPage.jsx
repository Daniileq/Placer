import React from 'react';
// import userSlice from '../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';
import './UserPage.css';
import CardPlace from '../CardPlace/CardPlace.jsx';

function UserPage() {
  const user = useSelector((state) => state.user.data);
  return (
    <div className='profile_container'>
      <div className="profile_content">
        <div className='backbtn'><a href='/'>← Back</a></div>
        <div className='profile'>
          <div className='user_info'>
            <img src={user.photo} alt="фото" className="user_photo"/>
            <div className='user_name'>{user.displayName}</div>
            <div className='user_email'>{user.email}</div>
          </div>
          <div className='user_data'>
            <div className='my_data'>Мои данные</div>
            <div className='details'>Обо мне: {user.about}</div>
            <div className='details'>Логин: {user.login}</div>
            <div className='details'>Пол: {user.sex}</div>
            <div className='details'>Возраст: {user.age}</div>
            <div className='details'>Город: {user.city}</div>
          </div>
        </div>
        <div className='places'>
          <div className='my_places'>
            <h3>Мои места</h3>
            <div className='cards'>
              {user.places.length && user.places.map((place) => <CardPlace place={place}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
