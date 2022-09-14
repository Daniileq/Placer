/* eslint-disable no-undef */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment } from '../../store/commentSlice.js/commentSlice';

function AddComment() {
  const { id } = useParams();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const content = e.target.content.value;
    const data = {
      content,
      placeId: Number(id),
    };
    dispatch(addComment(data));
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='content' />
      <button type='submit'>Добавить комментарий</button>
    </form>
  );
}

export default AddComment;
/* eslint-enable no-undef */
