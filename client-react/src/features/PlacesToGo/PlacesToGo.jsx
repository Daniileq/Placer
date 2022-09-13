import './PlacesToGo.css';

import { useSelector } from 'react-redux';
import CardPlace from '../CardPlace/CardPlace.jsx';

function PlacesToGo() {
  const placesToGo = useSelector((state) => state.places.placesToGo);
  return (
    <div>
    {placesToGo.map((place) => <CardPlace place={place} key={place.id} />)}
  </div>
  );
}

export default PlacesToGo;
