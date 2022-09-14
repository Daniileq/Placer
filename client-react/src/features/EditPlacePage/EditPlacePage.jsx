import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePlace, editPlace, loadPlace } from '../../store/placeSlice/placeSlice';
import { loadTags } from '../../store/searchSlice/searchSlice';
import './EditPlacePage.css';

function EditPlacePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const place = useSelector((state) => state.place.data);
  const tags = useSelector((state) => state.search.filters.tags);

  useEffect(() => {
    dispatch(loadTags());
    dispatch(loadPlace(id));
  }, [dispatch, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(editPlace({ id, data }));
  };

  const handleClick = () => {
    dispatch(deletePlace(id));
    if (place.isDeleted) {
      navigate('/');
    }
  };

  return (
    <form className="edit_form" onSubmit={handleSubmit}>
    <h4>Отредактировать место</h4>

    <label htmlFor="title">Название места:</label>
    <input type="text" name="title" id='title'defaultValue={place.title} required />
    <label htmlFor="adress">Адрес:</label>
    <input type="float" name="adress" id='adress' defaultValue={place.adress} required />
    <label htmlFor="longitude">Долгота:</label>
    <input type="float" name="longitude" id='longitude'defaultValue={place.longitude} required />
    <label htmlFor="latitude">Широта:</label>
    <input type="float" name="latitude" id='latitude' defaultValue={place.latitude} required />

    <label htmlFor="category">Категория:</label>
    <select
      className='select-css'
      id='category'
      name='сategory'
      >
        {place.Category
        && <option selected="selected">{place.Category.title}</option>
        }
        <option>Парки</option>
        <option>Кафе</option>
        <option>Театры</option>
        <option>Новые пространства</option>
        <option>Активный отдых</option>
        <option>Открой новое</option>
    </select>
    <div className='tags_input'>
        <p>Тэги: </p>
        {tags.map((tag, tagIndex) => (
          <div key={tag.id} className='tags_input_option'>
            <input
              className='checkbox_input'
              id={`tags_${tag.id}`}
              type="checkbox"
              tagId={tag.id}
              name={`tags_${tagIndex}`}
            />
            <label className='tag_label' htmlFor={`tags_${tag.id}`}>
              {tag.title}
            </label>
          </div>
        ))}
      </div>
    <label htmlFor="description">Описание:</label>
    <textarea type="text" name="description" id='description' defaultValue={place ? place.description : null} required />
    <button className='edit_place_btn' type="submit">Отправить изменения</button>
    <button className='delete_place_btn' type="submit" onClick={handleClick}>Удалить место</button>
  </form>
  );
}

export default EditPlacePage;
