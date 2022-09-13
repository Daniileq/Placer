/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  filters: {
    tags: [],
    categories: [],
  },
  activeFilters: {
    tagsId: [],
    categoriesId: [],
  },
  places: [],
  keywordPlaces: [],
  loading: false,
  error: null,
};

const loadTags = createAsyncThunk(
  'search/loadTags',
  () => fetch('/api/tags')
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const loadCategories = createAsyncThunk(
  'search/loadCategories',
  () => fetch('/api/categories')
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const loadPlaces = createAsyncThunk(
  'search/loadPlaces',
  ({ categories, tags }) => fetch(`/api/search?categories=${categories}&tags=${tags}`)
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleTag: (state, action) => {
      const toggledTagId = action.payload;
      if (!state.activeFilters.tagsId.includes(toggledTagId)) {
        state.activeFilters.tagsId.push(toggledTagId);
        return;
      }
      state.activeFilters.tagsId = state.activeFilters.tagsId
        .filter((tagId) => tagId !== toggledTagId);
    },
    toggleCategory: (state, action) => {
      const toggledCategoryId = action.payload;
      if (!state.activeFilters.categoriesId.includes(toggledCategoryId)) {
        state.activeFilters.categoriesId.push(toggledCategoryId);
        return;
      }
      state.activeFilters.categoriesId = state.activeFilters.categoriesId
        .filter((categoryId) => categoryId !== toggledCategoryId);
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    keywordFilter: (state, action) => {
      state.keywordPlaces = state.places
        .filter(
          (place) => {
            const tagsString = place.PlaceTags.map((placeTag) => placeTag.Tag.title).join(' ');
            const generalString = `${place.title} ${place.description} ${tagsString}`;
            return generalString.toLowerCase().includes(action.payload.keyword.toLowerCase());
          },
        );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTags.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadTags.fulfilled, (state, action) => {
        state.filters.tags = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.filters.categories = action.payload;
      })
      .addCase(loadPlaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
        state.keywordPlaces = state.places
          .filter(
            (place) => {
              const tagsString = place.PlaceTags.map((placeTag) => placeTag.Tag.title).join(' ');
              const generalString = `${place.title} ${place.description} ${tagsString}`;
              return generalString.toLowerCase().includes(state.keyword.toLowerCase());
            },
          );
      });
  },
});

// Экспорт reducer-функции
export default searchSlice.reducer;

// Экспорт action creator-функций
export const {
  toggleTag, toggleCategory, setKeyword, keywordFilter,
} = searchSlice.actions;

// Экспорт action creator-функций (thunk)
export {
  loadTags, loadCategories, loadPlaces,
};

/* eslint-enable no-param-reassign */
