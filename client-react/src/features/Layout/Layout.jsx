import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import './Layout.css';
import Map from '../Map/Map.jsx';

function Layout() {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const getApiKey = async () => {
      const response = await fetch('/apikey');
      const { API_KEY } = await response.json();
      setApiKey(API_KEY);
    };
    getApiKey();
  }, []);

  return (
  <>
    {apiKey && <>
      <script src={`https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`} type="text/javascript" />
      <script defer src="/map.js" type="text/javascript" />
    </>}
    <Header />
    <main>
      <div className='container'>
        <Map />
        <Outlet />
      </div>
    </main>
    <Footer />
  </>
  );
}

export default Layout;
