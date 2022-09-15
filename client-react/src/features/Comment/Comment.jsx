import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/commentSlice.js/commentSlice';

import './Comment.css';

function Comment({ comment, place }) {
  const userId = useSelector((state) => state.user.data.id);
  const dispatch = useDispatch();
  const data = {
    commentId: comment.id,
    placeId: place.id,
  };
  const deleteFunction = () => {
    dispatch(deleteComment(data));
  };

  return (
    <>
      {comment
        && <div className='comment_container'>
          <span className='font_subheading_small'>{comment.User.login}</span>
          <div className='comment_container_content'>
            <p>{comment.content}</p>
            {userId === comment.userId
              ? (
                <div className='comment_buttons'>
                  <button>✏️</button> <button onClick={deleteFunction}>❌</button>
                </div>
              )
              : null}
          </div>
        </div>
      }
    </>
  );
}

export default Comment;
