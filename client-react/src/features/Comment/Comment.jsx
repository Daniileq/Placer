import React from 'react';
import './Comment.css';

function Comment({ comment }) {
  return (
    <>
    { comment
      && <div className='comment_contaiiner'>
        <h5>{comment.User.displayName}</h5>
        <p>{comment.content}</p>
      </div>
    }
  </>
  );
}

export default Comment;
