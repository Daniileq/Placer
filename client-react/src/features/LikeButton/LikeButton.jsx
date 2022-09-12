import React from 'react';
import './LikeButton.css';
import { useSelector } from 'react-redux';

function LikeButton({ place }) {
  const user = useSelector((state) => state.user.data);
  // console.log(user);

  const handleLikeSubmit = (e) => {
    e.preventDefault();
    // `/books/like/${book.id}`
    console.log(place);
  };

  return (
        <div>
            <div className="likesContainer">
                <form name="likeForm" onSubmit={handleLikeSubmit}>

                    <button type='submit' className='btn'> Нравится </button>
                {/* <button type="submit" className="btn">
                    {book.Likes.some((like) => like.userId === user.id)
                      ? (<i className="bi bi-heart-fill" />)
                      : (<i className="bi bi-heart" />)}
                </button> */}
            </form>
            {/* <div className="currentLikes">{book.Likes.length}</div> */}
            <div className="currentLikes">120</div>

        </div>
    </div >
  );
}

export default LikeButton;
