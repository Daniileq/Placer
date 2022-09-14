import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Filters.css';

import {
  loadTags,
  loadCategories,
  toggleTag,
  toggleCategory,
} from '../../store/searchSlice/searchSlice';

function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);
  const activeFilters = useSelector((state) => state.search.activeFilters);

  useEffect(() => {
    dispatch(loadTags());
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div className="filters_container">
      <div className='category'>
        <p>КАТЕГОРИИ: </p>
        <div className="options_container">
          {filters.categories.map((category) => (
            <div className='option_item font_caption' key={category.id}>
              <input
                data-id={category.id}
                id={`categories_${category.id}`}
                type='checkbox'
                onChange={(event) => {
                  dispatch(toggleCategory(Number(event.target.dataset.id)));
                }}
              />
              {activeFilters.categoriesId.includes(category.id) ? (
                <label htmlFor={`categories_${category.id}`}>
                  <div className='checked_option'>
                    {category.title}
                  </div>
                </label>
              ) : (
                <label htmlFor={`categories_${category.id}`}>
                  <div className='not_checked_option'>
                    {category.title}
                  </div>
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='tags'>
        <p>ТЭГИ:</p>
        <div className="options_container">
          {filters.tags.map((tag) => (
            <div className='option_item font_caption' key={tag.id}>
              <input
                data-id={tag.id}
                id={`tags_${tag.id}`}
                type='checkbox'
                onChange={(event) => {
                  dispatch(toggleTag(Number(event.target.dataset.id)));
                }}
              />
              {activeFilters.tagsId.includes(tag.id) ? (
                <label htmlFor={`tags_${tag.id}`}>
                  <div className='checked_option'>
                    {tag.title}
                  </div>
                </label>
              ) : (
                <label htmlFor={`tags_${tag.id}`}>
                  <div className='not_checked_option'>
                    {tag.title}
                  </div>
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
