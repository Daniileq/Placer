import { useSelector } from 'react-redux';
import CardPlace from '../CardPlace/CardPlace.jsx';
import './FavoritesPage.css';

function FavoritesPage() {
  const favoritePlaces = useSelector((state) => state.places.favoritePlaces);

  return (
    <div className='content_container flex_container'>
      {favoritePlaces.map((place) => <CardPlace place={place} key={place.id} />)}
    </div>
  );
}

export default FavoritesPage;
