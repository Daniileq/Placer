import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deletePlace, disablePlace, editPlace, loadPlace,
} from '../../store/placeSlice/placeSlice';
import { loadTags, loadCategories } from '../../store/searchSlice/searchSlice';
import '../AddPlacePage/AddPlacePage.css';
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
      setLongitude(place.longitude);
      setLatitude(place.latitude);
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
    <div className='content_container'>
    <form className="add_place_form" onSubmit={handleSubmit}>
    <h4>Отредактировать место</h4>

    <p className='font_subheading'>Название места:</p>
    <input type="text" name="title" id='title'defaultValue={place.title} required />
    <p className='font_subheading'>Адрес:</p>
      <input
        id="address"
        name="address"
        value={address === null ? place.address : address}
        onChange={(event) => setAddress((event.target.value))}
        required
      />
    <p className='font_subheading'>Положение на карте:</p>
    <div className='add_place_map_div'>
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
      </div>
      <input
        style={{ visibility: 'hidden' }}
        id="longitude"
        name="longitude"
        value={longitude}
        onChange={(event) => setLongitude(Number(event.target.value))}
      />
      {/* <label htmlFor="latitude">Широта:</label> */}
      <input
        style={{ display: 'none' }}
        id="latitude"
        name="latitude"
        value={latitude}
        onChange={(event) => setLatitude(Number(event.target.value))}
      />

      <div className="input_place_image_div">
          <label className="input_place_image" style={{ fontSize: '24px', width: '100%' }} htmlFor="placeImages">Фотографии места:
            <input
              type="file"
              id="placeImages"
              name="placeImages"
              className="photoInput"
              accept="image/*,.png,.jpg,.jpeg"
              multiple
            />
            <span>Выбрать фото</span>
          </label>
        </div>

    <div className="category_input">
      <p className='font_subheading'>Категория:</p>
    {place.Category
      && (
      <select
        className='categoryId'
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
    </div>
    <p className='font_subheading'>Тэги:</p>
    <div className='tags_input'>
      {filters.tags.map((tag, tagIndex) => (
        <div key={tag.id} className='tags_input_option'>
          <input
            className='checkbox_input'
            id={`tags_${tag.id}`}
            type="checkbox"
            tagid={tag.id}
            name={`tags_${tagIndex}`}
            defaultChecked={place.PlaceTags.some((placeTag) => tag.id === placeTag.Tag.id)}
            style={{ width: '10%' }}
          />
          <label className='tag_label' htmlFor={`tags_${tag.id}`}>
            {tag.title}
          </label>
        </div>
      ))}
    </div>
    <p className='font_subheading' htmlFor="description">Описание:</p>
    <textarea type="text" name="description" id='description' defaultValue={place ? place.description : null} required />
    <button className='edit_place_btn' type="submit">Отправить изменения</button>
    <button className='delete_place_btn' type="submit" onClick={handleClick}>Удалить место</button>
  </form>
  </div>
  );
}

export default EditPlacePage;
