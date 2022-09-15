import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deletePlace, disablePlace, editPlace, loadPlace,
} from '../../store/placeSlice/placeSlice';
import { loadTags, loadCategories } from '../../store/searchSlice/searchSlice';
import './EditPlacePage.css';
import AddPlaceOnMap from '../Map/AddPlaceOnMap.jsx';
import Loader from '../Loader/Loader.jsx';

function EditPlacePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initCoords, setInitCoords] = useState([null, null]);
  const [address, setAddress] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const { id } = useParams();

  const { loading, data: place } = useSelector((state) => state.place);
  const success = useSelector((state) => state.place.success);
  const filters = useSelector((state) => state.search.filters);

  useEffect(() => {
    dispatch(loadTags());
    dispatch(loadCategories());
    dispatch(loadPlace(id));
    return () => {
      dispatch(disablePlace());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading) {
      setInitCoords([place.longitude, place.latitude]);
      setCategoryId(place.Category.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(editPlace({ id, data }));

    if (success) {
      navigate(`/places/${id}`);
    }
  };

  const handleClick = () => {
    dispatch(deletePlace(id));
    if (place.isDeleted) {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <form className="edit_form" onSubmit={handleSubmit}>
    <h4>Отредактировать место</h4>

    <label htmlFor="title">Название места:</label>
    <input type="text" name="title" id='title'defaultValue={place.title} required />
    <label htmlFor="address">Адрес:</label>
      <input
        id="address"
        name="address"
        value={address === null ? place.address : address}
        onChange={(event) => setAddress((event.target.value))}
        required
      />
    <p>Положение на карте:</p>
      {!loading
      && initCoords[0]
      && initCoords[1]
      && <AddPlaceOnMap
          setAddress={setAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          initCoords={initCoords}
        />
      }
      <input
        style={{ visibility: 'hidden' }}
        id="longitude"
        name="longitude"
        value={longitude}
        onChange={(event) => setLongitude(Number(event.target.value))}
      />
      {/* <label htmlFor="latitude">Широта:</label> */}
      <input
        style={{ visibility: 'hidden' }}
        id="latitude"
        name="latitude"
        value={latitude}
        onChange={(event) => setLatitude(Number(event.target.value))}
      />
      <label htmlFor="placeImages">Фотографии места:</label>
      <input
        type="file"
        id="placeImages"
        name="placeImages"
        accept="image/*,.png,.jpg,.jpeg"
        multiple
      />
    <label htmlFor="category">Категория:</label>
    {place.Category
      && (
      <select
        className='select-css'
        id='categoryId'
        name='categoryId'
        value={categoryId === null ? '' : categoryId}
        onChange={(event) => setCategoryId(Number(event.target.value))}
      >
      <option>Не выбрано</option>
        {filters.categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.title}
          </option>
        ))}
      </select>
      )
    }
    <div className='tags_input'>
      <p>Тэги: </p>
      {filters.tags.map((tag, tagIndex) => (
        <div key={tag.id} className='tags_input_option'>
          <input
            className='checkbox_input'
            id={`tags_${tag.id}`}
            type="checkbox"
            tagId={tag.id}
            name={`tags_${tagIndex}`}
            defaultChecked={place.PlaceTags.some((placeTag) => tag.id === placeTag.Tag.id)}
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
