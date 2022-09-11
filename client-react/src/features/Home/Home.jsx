import SearchPage from '../SearchPage/SearchPage.jsx';
import './Home.css';

function Home() {
  return (
    <div>
      <div className='welcome_container'>
        <img
          className='welcome_pic'
          src='http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg'
          alt='background_welcome' />
        <div className='welcome_pic_back'></div>
        <div className='greeting'><div>Добро пожаловать</div><div>в <span id="newPlace">новое место</span></div></div>
        <a href='#search_place_title'>
          <div className='welcome_button'>Поиск мест</div>
        </a>
      </div>
      <SearchPage />
    </div>
  );
}

export default Home;
