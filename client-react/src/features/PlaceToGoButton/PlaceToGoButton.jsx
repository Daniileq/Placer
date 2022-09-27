import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGo } from '../../store/placesSlice/placesSlice';
import './PlaceToGoButton.css';

const manWalk = (<svg className="man_walk" width="24" height="32" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 21.5001L8.5 10.5001L6.5 11.5001L5.5 16.0001C5.33333 16.1667 4.8 16.5 4 16.5C3.2 16.5 3 15.8333 3 15.5L4.5 10C6.33333 8.83336 10.3 6.40007 11.5 6.00007C12.7 5.60007 14 6.50007 14.5 7.00007C15.5 9 16.5 10.5001 17 11.5001L21 14.0001C21 15.0001 21.5 16.0001 19.5 16.0001C17.9 16.0001 16.1667 14.3334 15.5 13.5001L14 11.0001L13 16.0001L18 21.5001L19 29.0001C19 29.1667 18.7 29.6001 17.5 30.0001C16.3 30.4001 15.6667 29.5001 15.5 29.0001L14 23.0001L10 19.0001L9 23.5001L5 29.5001C4.5 29.8334 3.3 30.3001 2.5 29.5001C1.7 28.7001 1.83333 27.8334 2 27.5001L6 21.5001Z" stroke="currentColor" />
  <circle cx="12.5" cy="2.5" r="2" stroke="currentColor" />
</svg>
);

const manWalkFill = (<svg className="man_walk_fill" width="24" height="32" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.99997 22.5001L8.49997 11.5001L6.49997 12.5001L5.49997 17.0001C5.3333 17.1667 4.79997 17.5 3.99997 17.5C3.19997 17.5 2.99997 16.8333 2.99997 16.5L4.49997 11C6.3333 9.83336 10.3 7.40007 11.5 7.00007C12.7 6.60007 14 7.50007 14.5 8.00007C15.5 10 16.5 11.5001 17 12.5001L21 15.0001C21 16.0001 21.5 17.0001 19.5 17.0001C17.9 17.0001 16.1666 15.3334 15.5 14.5001L14 12.0001L13 17.0001L18 22.5001L19 30.0001C19 30.1667 18.7 30.6001 17.5 31.0001C16.3 31.4001 15.6666 30.5001 15.5 30.0001L14 24.0001L9.99997 20.0001L8.99997 24.5001L4.99997 30.5001C4.49997 30.8334 3.29997 31.3001 2.49997 30.5001C1.69997 29.7001 1.8333 28.8334 1.99997 28.5001L5.99997 22.5001Z" fill="currentColor" />
  <circle cx="12.5" cy="3.5" r="2.5" fill="currentColor" />
</svg>
);

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
      <form className='place_to_go_form' onSubmit={handlePlaceToGoSubmit}>
        <button className='place_to_go_btn font_caption_small'>
          {isGoOn
            ? manWalkFill
            : manWalk
          }
        </button>
      </form>
      <div className="current_to_go">
        {place.PlaceToGos.filter(
          (placetogo) => placetogo.userId !== userId,
        ).length + Number(isGoOn)}
      </div>
    </div>
  );
}
export default PlaceToGoButton;
