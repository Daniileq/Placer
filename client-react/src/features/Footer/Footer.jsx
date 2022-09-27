import { Link } from 'react-router-dom';
import './Footer.css';
import facebook from './img/facebook.png';
import twitter from './img/twitter.png';
import linkedIn from './img/linkedIn.png';

function Footer() {
  return (
    <footer>
      <div className='content_container'>
        <div className='content_footer_container'>

          <div className='footer_logo'>PLACER</div>
          <div className='footer_navigation'>
            <div className='navigation_links'><Link to="/">На главную</Link></div>
            <div className='navigation_links'><Link to="/about">О проекте</Link></div>
            <div className='navigation_links'><Link to="/contacts">Контакты</Link></div>
          </div>
          <div className='footer_line'></div>
          <div className='above_footer_line'>
            <div className='copyright'>© JAYS SPb, 2022 till infinity</div>
            <div className='social_media'>
              <img src={facebook} alt="facebook" />
              <img src={twitter} alt="twitter" />
              <img src={linkedIn} alt="linkedIn" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
