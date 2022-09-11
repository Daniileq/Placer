import './Footer.css';
import facebook from './img/facebook.png';
import twitter from './img/twitter.png';
import linkedIn from './img/linkedIn.png';

function Footer() {
  return (
    <footer>
        <div className='footerLogo'>PLACER</div>
        <div className='footerNavigation'>
          <div className='navigationLinks'>На главную</div>
          <div className='navigationLinks'>О проекте</div>
          <div className='navigationLinks'>Контакты</div>
        </div>
        <div className='footerLine'></div>
        <div className='copyright'>© JAYS SPb, 2022 till infinity</div>
        <div className='socialMedia'>
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
          <img src={linkedIn} alt="linkedIn" />
        </div>
    </footer>
  );
}

export default Footer;
