/* eslint-disable no-undef */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment } from '../../store/commentSlice.js/commentSlice';
import './AddComment.css';

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
      <textarea type='text' name='content' placeholder='Введите комментарий' rows='3' required />
      <button className='font_caption_small' type='submit'>Добавить комментарий</button>
    </form>
  );
}

export default AddComment;
/* eslint-enable no-undef */
