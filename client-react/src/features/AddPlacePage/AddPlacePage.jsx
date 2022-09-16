import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, loadTags } from '../../store/searchSlice/searchSlice';
import { addPlace } from '../../store/addPlaceSlice/addPlaceSlice';
import './AddPlacePage.css';
import AddPlaceOnMap from '../Map/AddPlaceOnMap.jsx';

function AddPlacePage() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  useEffect(() => {
    dispatch(loadTags());
    dispatch(loadCategories());
  }, [dispatch]);

  const addPlaceFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(addPlace(data));
    navigate(`/${user.login}`);
  };

  return (
    <div className='content_container'>
      <form className="add_place_form" onSubmit={addPlaceFormSubmit}>
        <h4>Добавление места</h4>
        <label htmlFor="title">Название места:</label>
        <input id="title" name="title" required />
        <label htmlFor="address">Адрес:</label>
        <input
          id="address"
          name="address"
          value={address}
          onChange={(event) => setAddress((event.target.value))}
          required
        />
        {/* <div className="coordinates"> */}
        <p>Положение на карте:</p>
        <div className='add_place_map_div'>
        <AddPlaceOnMap
          setAddress={setAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        </div>
        {/* <label htmlFor="longitude">Долгота:</label> */}
        <input
          style={{ visibility: 'hidden' }}
          id="longitude"
          name="longitude"
          value={longitude}
          onChange={(event) => setLongitude(Number(event.target.value))}
          required
        />
        {/* <label htmlFor="latitude">Широта:</label> */}
        <input
          style={{ visibility: 'hidden' }}
          id="latitude"
          name="latitude"
          value={latitude}
          onChange={(event) => setLatitude(Number(event.target.value))}
          required
        />

        <div className="input_place_image_div">
          <label className="input_place_image" htmlFor="placeImages">Фотографии места:
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
          <p>Категория:</p>
          <select name="categoryId" className='categoryId' required>
            <option>Не выбрано</option>
            {filters.categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

          <p>Тэги:</p>
        <div className="tags_input">
          {filters.tags.map((tag, tagIndex) => (
            <div key={tag.id} className="tags_input_option">
              <input
                className="checkbox_input"
                id={`tags_${tag.id}`}
                type="checkbox"
                tagid={tag.id}
                name={`tags_${tagIndex}`}
              />
              <label className="tag_label" htmlFor={`tags_${tag.id}`}>
                {tag.title}
              </label>
            </div>
          ))}
        </div>

        <textarea className="description" id="description" name="description" />
        <button className="add_place_btn" type="submit">
          Добавить место
        </button>
      </form>
    </div>
  );
}

export default AddPlacePage;
