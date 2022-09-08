import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
  <nav>
    <ul>
      <li>
        <NavLink to='/'>home</NavLink>
      </li>
    </ul>
  </nav>
  );
}

export default Navigation;
