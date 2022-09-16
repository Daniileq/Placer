import SearchPage from '../SearchPage/SearchPage.jsx';
import './Home.css';

function Home() {
  return (
    <>
      <div className='welcome_container'>
        <div className='content_container'>
          <div className='welcome_content_container'>
            <div className='welcome_container_text'>
              <h1>
                <div className='greeting'>
                  <div>
                    Добро пожаловать
                  </div>
                  <div>
                    в <span id="new_place">новое место</span>
                  </div>
                </div>
              </h1>
              <a className='search_link' href='#search_place_title'>
                поиск мест
              </a>
            </div>
            <div className='welcome_pic_wrapper'>
              <img
                className='welcome_pic'
                src='https://w0.peakpx.com/wallpaper/40/357/HD-wallpaper-beautiful-place-forest-colorful-glade-place-beautiful-trees-green-peaceful-nature.jpg'
                alt='background_welcome'
              />
            </div>
          </div>
        </div>
      </div>
      <SearchPage />
    </>
  );
}

export default Home;
