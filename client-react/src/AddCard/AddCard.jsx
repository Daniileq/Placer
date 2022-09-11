// eslint-disable-next-line quotes
import { useEffect } from 'react';
// eslint-disable-next-line quotes
import { useDispatch } from 'react-redux';
// eslint-disable-next-line quotes
import { addPlaces } from './reduserAddCard';

function AddCard() {
  const dispatch = useDispatch();
  //   const places = useSelector((place) => place.payload.data);
  //   const erorr = useSelector((message) => message.payload.erorr);

  const addPlace = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const adress = event.target.adress.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const submit = event.target.submit.value;
    const response = await fetch('/myplace', {
      method: 'POST',
      body: JSON.stringify({
        title,
        adress,
        description,
        category,
        submit,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    console.log(body);
    if (body.error) {
      throw new Error(body.error);
    }
    const action = addPlaces(body.data);
    return dispatch(action);
  };

  useEffect(() => {
    addPlace();
  }, [dispatch]);

  return (
    <>
      <form onSubmit={addPlace} action="myplace" method="post">
        <input name="title" />
        <input name="adress" />
        <input name="description" />
        <input name="category" />
        <button type="submit">Добавить </button>
      </form>
    </>
  );
}

export default AddCard;
