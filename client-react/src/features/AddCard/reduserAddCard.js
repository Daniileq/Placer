const initialState = {
  data: [],
  erorr: null,
};

const types = {
  // eslint-disable-next-line quotes
  ADD_CARD: 'ADD_CARD',
  // eslint-disable-next-line quotes
  REJECTED_ADD_CARD: 'REJECTED_ADD_CARD',
};
const actions = {
  addPlaces: (place) => ({ types: types.ADD_CARD, payload: place }),
  rejectedAddPlaces: (place) => ({
    types: types.REJECTED_ADD_CARD,
    payload: place,
  }),
};

function addReduser(state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.types) {
    case types.ADD_CARD: {
      const newPlaces = action.payload;
      const newState = {
        ...state,
        data: newPlaces,
        erorr: null,
      };
      return newState;
    }
    case types.REJECTED_ADD_CARD: {
      const message = action.payload;
      const newPost = {
        ...state,
        erorr: message,
      };
      return newPost;
    }
    default: {
      return state;
    }
  }
}
export default addReduser;
export { initialState };
export const { addPlaces, rejectedAddPlaces } = actions;
