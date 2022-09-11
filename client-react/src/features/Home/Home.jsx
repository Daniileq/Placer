import SearchPage from '../SearchPage/SearchPage.jsx';
import './Home.css';

function Home() {
  return (
    <>
      <div className='welcome_container'>
        <div className='content_container'>
          <div className='welcome_content_container'>
            <div className='welcome_container_text'>
              <h1><div className='greeting'><div>Добро пожаловать</div><div>в <span id="new_place">новое место</span></div></div></h1>
              <a href='#search_place_title'>
                <div className='welcome_button font_button'>Поиск мест</div>
              </a>
            </div>
            <img
              className='welcome_pic'
              src='http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg'
              alt='background_welcome' />
            {/* <div className='welcome_pic_back'></div> */}
          </div>
        </div>
      </div>
      <SearchPage />
    </>
  );
}

export default Home;
