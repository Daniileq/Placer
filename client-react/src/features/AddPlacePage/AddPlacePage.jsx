import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, loadTags } from '../../store/searchSlice/searchSlice';
import { addPlace } from '../../store/addPlaceSlice/addPlaceSlice';
import './AddPlacePage.css';

function AddPlacePage() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    ymaps.ready(() => {
      // eslint-disable-next-line no-undef
      const myMap = new ymaps.Map(
        'map',
        {
          center: [59.94, 30.32],
          zoom: 9,
        },
        {
          searchControlProvider: 'yandex#search',
        }
      );

      // Слушаем клик на карте.
      myMap.events.add('click', (e) => {
        let coords = e.get('coords');

        console.log(coords);
        // Если метка уже создана – просто передвигаем ее.
        const myPlacemark = new ymaps.Placemark(
          [coords[0], coords[1]],
          {},
          {
            preset: 'islands#blueIcon',
          }
        );

        myMap.geoObjects.add(myPlacemark);
        console.log(myPlacemark);
      });
    });
  }, []);

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
      <label htmlFor="adress">Адрес:</label>
      <input id="adress" name="adress" required />
      {/* <div className="coordinates"> */}
      <p>Координаты:</p>
      <div
        // onClick={(e) => mapClick(e)}
        id="map"
        style={{ width: `${450}px`, height: `${350}px` }}
      >
        карта
      </div>
      {/* <label htmlFor="longitude">Долгота:</label>
      <input id="longitude" name="longitude" required />
      <label htmlFor="latitude">Широта:</label>
      <input id="latitude" name="latitude" required /> */}
      {/* </div> */}
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
              tagId={tag.id}
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
