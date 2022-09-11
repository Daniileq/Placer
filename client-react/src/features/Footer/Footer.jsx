import './Footer.css';
import facebook from './img/facebook.png';
import twitter from './img/twitter.png';
import linkedIn from './img/linkedIn.png';

function Footer() {
  return (
    <footer>
        <div className='footer_logo'>PLACER</div>
        <div className='footer_navigation'>
          <div className='navigation_links'>На главную</div>
          <div className='navigation_links'>О проекте</div>
          <div className='navigation_links'>Контакты</div>
        </div>
        <div className='footer_line'></div>
        <div className='copyright'>© JAYS SPb, 2022 till infinity</div>
        <div className='social_media'>
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
          <img src={linkedIn} alt="linkedIn" />
        </div>
    </footer>
  );
}

export default Footer;
