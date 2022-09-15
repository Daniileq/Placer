/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, changeComment } from '../../store/commentSlice.js/commentSlice';

import './Comment.css';

function Comment({ comment, place }) {
  const [showEditCom, setShowEditCom] = useState(false);
  const userId = useSelector((state) => state.user.data.id);
  const dispatch = useDispatch();
  const data = {
    commentId: comment.id,
    placeId: place.id,
  };
  const deleteFunction = () => {
    dispatch(deleteComment(data));
  };

  const changeFunction = (e) => {
    e.preventDefault();
    const content = e.target.contentComment.value;
    const changedComment = {
      content,
      commentId: comment.id,
      placeId: place.id,
    };
    dispatch(changeComment(changedComment));
    setShowEditCom((prev) => !prev);
  };

  return (
    <>
      {comment
        && <div className='comment_container'>
          <span className='font_subheading_small'>{comment.User.login}</span>
          <div className='comment_container_content font_caption_small'>

            {showEditCom === true
              ? (
              <div className='change_comment_div'>
                <form onSubmit={changeFunction}>
                  <input defaultValue={comment.content} name='contentComment' ></input>
                  <button type='submit'>Сохранить</button>
                </form>
              </div>
              ) : (<p>{comment.content}</p>)}
            {userId === comment.userId ? (<div className='comment_buttons'>
                  <button onClick={() => setShowEditCom((prev) => !prev)}>✏️</button> <button onClick={deleteFunction}>❌</button>
                </div>
            ) : null}

          </div>
        </div>
      }
    </>
  );
}

export default Comment;
