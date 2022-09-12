import React from 'react';

function Comment({ comment }) {
  return (
    <div>
      <h5>{comment.userId}</h5>
      <p>{comment.content}</p>
    </div>
  );
}

export default Comment;
