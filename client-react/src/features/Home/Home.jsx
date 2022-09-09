import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchPage from '../SearchPage/SearchPage.jsx';
import './Home.css';
// import {
//   loadTest,
//   getUserLogin,
// } from '../../store/userSlice/userSlice';

function Home() {
  //   const dispatch = useDispatch();
  //   const login = useSelector(getUserLogin);
  // useEffect(() => {
  //     dispatch(loadTest());
  //   }, [dispatch]);

  return (
    <div>
      <h1>Placer</h1>
      <h2>Welcome to the New Place</h2>
      {/* <p>{login}</p> */}
      <div className='welcome_container'>
        <img className='welcome_pic' src='http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg' />
        <div className='welcome_pic_back'></div>
        <h1><div className='greeting'><div>Добро пожаловать</div><div>в <span id="new_place">новое место</span></div></div></h1>
        <a><div className='welcome-button'>Main button</div></a>
      </div>
      <SearchPage />
    </div>
  );
}

export default Home;
