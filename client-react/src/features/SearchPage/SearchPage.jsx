import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filters from '../Filters/Filters.jsx';
import CardPlace from '../CardPlace/CardPlace.jsx';
import './SearchPage.css';

import {
  loadPlaces,
} from '../../store/searchSlice/searchSlice';

function SearchPage() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const loading = useSelector((state) => state.search.loading);
  const places = useSelector((state) => state.search.places);

  useEffect(() => {
    const tags = activeFilters.tagsId.length
      ? filters.tags
        .filter((tag) => activeFilters.tagsId.includes(tag.id))
        .map((tag) => tag.id)
        .join('+')
      : 'all';
    const categories = activeFilters.categoriesId.length
      ? filters.categories
        .filter((category) => activeFilters.categoriesId.includes(category.id))
        .map((category) => category.id)
        .join('+')
      : 'all';
    dispatch(loadPlaces({ categories, tags }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

  return (
    <div className='content_container'>
      <div className='search_container'>
        <h2 id='search_place_title'>Поиск мест</h2>
        <div className='search_content'>

          <div className='search_left_column'>
            <Filters />
          </div>

          <div className='search_right_column'>
            <form className='place_search_form' method="get">
              <label htmlFor="place_input">поиск:</label>
              <input
                id='place_input'
                name='place_input'
                className='place_input'
                type="text"
                placeholder='Введите ключевые слова...'
              />
            </form>
            <div className='search_results_container'>
              {loading && <p>...loading</p>}
              {!loading && places.map((place) => <CardPlace place={place} key={place.id} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
