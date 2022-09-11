import './SearchPage.css';

const categories = ['category1', 'category2', 'category3', 'category4', 'category5'];
const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];

function SearchPage() {
  return (
    <div className='content_container'>
      <div className='search_container'>
        <h2 id='search_place_title'>Поиск мест</h2>

        <div className='search_content'>
          <div className='search_left_column'>
            <div className="filters_container">
              <div className='category'>
                <p>категории</p>
                <div className="options_container">
                  {categories.map((category) => (
                    <button key={category}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className='tags'>
                <p>тэги</p>
                <div className="options_container">
                  {tags.map((tag) => (
                    <button key={tag}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='search_right_column'>
            <form className='place_search_form' method="get">
              <label htmlFor="place_input">поиск:</label>
              <input
                id='place_input'
                name='place_input'
                className='place_input'
                type="text"
                placeholder='...'
              />
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SearchPage;
