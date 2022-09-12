import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import './Layout.css';
import Map from '../Map/Map.jsx';
import BigMap from '../Map/BigMap.jsx';

function Layout() {
  return (
  <>
    <Header />
    <main>
      <div className='container'>
        <Outlet />
      </div>
    </main>
    <Footer />
  </>
  );
}

export default Layout;
