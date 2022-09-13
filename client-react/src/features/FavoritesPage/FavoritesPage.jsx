import { useSelector } from 'react-redux';
import CardPlace from '../CardPlace/CardPlace.jsx';

function FavoritesPage() {
  const favoritePlaces = useSelector((state) => state.places.favoritePlaces);

  return (
    <div>
      {favoritePlaces.map((place) => <CardPlace place={place} key={place.id} />)}
    </div>
  );
}

export default FavoritesPage;
