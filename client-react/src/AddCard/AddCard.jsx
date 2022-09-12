import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, loadTags } from '../store/searchSlice/searchSlice';
import { addPlaces } from './reduserAddCard';

function AddCard() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);

  useEffect(() => {
    dispatch(loadTags());
    dispatch(loadCategories());
  }, [dispatch]);
  //   const places = useSelector((place) => place.payload.data);
  //   const erorr = useSelector((message) => message.payload.erorr);
  const addPlace = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const adress = event.target.adress.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    // const categoryId = event.target.va;
    const titleTag = event.target.value;
    const tagId = event.target.getAttribute('tagId');
    const response = await fetch('/api/place', {
      method: 'POST',
      body: JSON.stringify({
        title,
        adress,
        description,
        category,
        isModerated: true,
        isDeleted: true,
        titleTag,
        tagId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (body.error) {
      throw new Error(body.error);
    }
    const action = addPlaces(body.data);
    return dispatch(action);
  };

  return (
    <form onSubmit={addPlace}>
      <input name="title" />
      <input name="adress" />
      <input name="description" />

      <select name="category">
        <option>Выбере категорию</option>
        {filters.categories.map((el) => (
          <option value={el.id} key={el.id}>
            {el.title}
          </option>
        ))}
      </select>

      <div>
        {filters.tags.map((el) => (
          <>
            <input
              id={`tags_${el.id}`}
              type="checkbox"
              tagId={el.id}
              name={`titleTag${el.id}`}
              key={el.id}
              value={el.id}
            />
            <label htmlFor={`tags_${el.id}`}>{el.title}</label>
          </>
        ))}
      </div>
      <button type="submit">Добавить </button>
    </form>
  );
}

export default AddCard;
