import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavorites } from '../../store/placesSlice/placesSliceDeprecated';
import CardPlace from '../CardPlace/CardPlace.jsx';

function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.places.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);
  return (
    <div>
      {favorites.map((place) => <CardPlace place={place} key={place.id} />)}
    </div>
  );
}

export default FavoritesPage;
