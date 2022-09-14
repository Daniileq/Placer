import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../../store/placesSlice/placesSliceDeprecated';
import './LikeButton.css';

const svgHeartFill = (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_855_375)">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.31405C12.438 -3.24795 23.534 4.73505 8 15.0001C-7.534 4.73605 3.562 -3.24795 8 1.31405Z" fill="#F4D3A1" />
  </g>
  <defs>
    <clipPath id="clip0_855_375">
      <rect width="16" height="16" fill="white" />
    </clipPath>
  </defs>
</svg>
);

const svgHeart = (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_855_373)">
    <path d="M7.99999 2.74805L7.28299 2.01105C5.59999 0.281049 2.51399 0.878049 1.39999 3.05305C0.876987 4.07605 0.758987 5.55305 1.71399 7.43805C2.63399 9.25305 4.54799 11.427 7.99999 13.795C11.452 11.427 13.365 9.25305 14.286 7.43805C15.241 5.55205 15.124 4.07605 14.6 3.05305C13.486 0.878049 10.4 0.280049 8.71699 2.01005L7.99999 2.74805ZM7.99999 15C-7.33301 4.86805 3.27899 -3.03995 7.82399 1.14305C7.88399 1.19805 7.94299 1.25505 7.99999 1.31405C8.05641 1.2551 8.11512 1.19839 8.17599 1.14405C12.72 -3.04195 23.333 4.86705 7.99999 15Z" fill="#F4D3A1" />
  </g>
  <defs>
    <clipPath id="clip0_855_373">
      <rect width="16" height="16" fill="white" />
    </clipPath>
  </defs>
</svg>
);

function LikeButton({ place }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data.id);
  const favoritePlaces = useSelector((state) => state.places.favoritePlaces);

  const favoritePlacesId = useMemo(
    () => favoritePlaces.map((favoritePlace) => favoritePlace.id),
    [favoritePlaces],
  );

  const isLiked = useMemo(
    () => favoritePlacesId.includes(place.id),
    [favoritePlacesId, place.id],
  );

  const handleLikeSubmit = (event) => {
    event.preventDefault();
    dispatch(toggleLike(place));
  };

  return (
    <div>
      <div className="likes_container">
        <form name="like_form" onSubmit={handleLikeSubmit}>
          <button type="submit" className="btn">
            {isLiked
              ? svgHeartFill
              : svgHeart}
          </button>
        </form>
        <div className="current_likes font_caption">
          {place.Likes.filter(
            (like) => like.userId !== userId,
          ).length + Number(isLiked)}
        </div>
      </div>
    </div >
  );
}

export default LikeButton;
