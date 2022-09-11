import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import './Layout.css';

function Layout() {
  return (
  <>
    <Header />
    <main>
        <Outlet />
    </main>
    <Footer />
  </>
  );
}

export default Layout;
