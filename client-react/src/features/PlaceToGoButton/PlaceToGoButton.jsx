import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGo } from '../../store/placesSlice/placesSliceDeprecated';
import './PlaceToGoButton.css';

function PlaceToGoButton({ place }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data.id);
  const placesToGo = useSelector((state) => state.places.placesToGo);

  const placesToGoId = useMemo(
    () => placesToGo.map((placeToGo) => placeToGo.id),
    [placesToGo],
  );

  const isGoOn = useMemo(
    () => placesToGoId.includes(place.id),
    [placesToGoId, place.id],
  );

  const handlePlaceToGoSubmit = async (e) => {
    e.preventDefault();
    dispatch(toggleGo(place));
  };
  return (
        <div className='place_to_go_container'>
            <form action="#" onSubmit={handlePlaceToGoSubmit}>
                <button type='submit' className='place_to_go_btn'>
                  {isGoOn
                    ? 'Хочу пойти'
                    : 'Иду'
                  }
                </button>
                <div className='font_caption_small'>
                  {place.PlaceToGos.filter(
                    (placetogo) => placetogo.userId !== userId,
                  ).length + Number(isGoOn)}
                </div>
            </form>
        </div>
  );
}
export default PlaceToGoButton;
