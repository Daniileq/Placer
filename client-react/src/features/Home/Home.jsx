// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
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
    <div className='welcome_container'>
      <img className='welcome_pic' src='http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg'/>
      <div className='welcome_pic_back'></div>
      <div className='greeting'><div>Добро пожаловать</div><div>в <span id="new_place">новое место</span></div></div>
     <a><div className='welcome-button'>Main button</div></a>
    </div>
  );
}

export default Home;
