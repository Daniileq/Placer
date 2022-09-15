import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, loadTags } from '../../store/searchSlice/searchSlice';
import { addPlace } from '../../store/addPlaceSlice/addPlaceSlice';
import './AddPlacePage.css';
import AddPlaceOnMap from '../Map/AddPlaceOnMap.jsx';

function AddPlacePage() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);

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
  };

  return (
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
      <AddPlaceOnMap setAddress={setAddress} setLatitude={setLatitude} setLongitude={setLongitude}/>
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
      <label htmlFor="placeImages">Фотографии места:</label>
      <input
        type="file"
        id="placeImages"
        name="placeImages"
        accept="image/*,.png,.jpg,.jpeg"
        multiple
      />
      <div className="category_input">
        <p>Категория:</p>
        <select name="categoryId" required>
          <option>Не выбрано</option>
          {filters.categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div className="tags_input">
        <p>Тэги:</p>
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
  );
}

export default AddPlacePage;
