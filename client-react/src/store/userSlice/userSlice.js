/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: {
    id: null,
    email: null,
    login: null,
    displayName: null,
    photo: null,
    age: null,
    sex: null,
    city: null,
    about: null,
    tgUsername: null,
    places: [],
    isAdmin: null,
  },
  isUser: null,
  helpMessage: null,
  error: null,
};

// Thunk!
const loadUser = createAsyncThunk(
  'user/loadUser',
  () => fetch('/auth')
    .then((response) => response.json())
    .then((body) => {
      if (!body.isUser) {
        // console.log(body.isUser);
        throw new Error(body.isUser);
      }
      // console.log(body.data);
      return body.user;
    }),
);

const loginUser = createAsyncThunk(
  'user/loginUser',
  (data) => fetch('/auth/login', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      if (body.message) {
        throw new Error(body.message);
      }
      return body.user;
    }),
);

const logoutUser = createAsyncThunk(
  'user/logoutUser',
  () => fetch('/auth/logout', {
    method: 'delete',
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.message;
    }),
);

const regUser = createAsyncThunk(
  'user/regUser',
  (data) => fetch('/auth/registration', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      if (body.message) {
        throw new Error(body.message);
      }
      return body.user;
    }),
);

const changeUser = createAsyncThunk(
  'user/changeUser',
  ({ data, userId }) => fetch(`/api/changeuser/${userId}`, {
    method: 'put',
    body: data,
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      if (body.message) {
        throw new Error(body.message);
      }
      return body.user;
    }),
);

const changeUserPass = createAsyncThunk(
  'user/changeUserPass',
  ({ data, userId }) => fetch(`/api/changeuserpass/${userId}`, {
    method: 'put',
    body: data,
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      if (body.message) {
        throw new Error(body.message);
      }
      return body.user;
    }),
);

const changeUserPhoto = createAsyncThunk(
  'user/changeUserPhoto',
  ({ data, userId }) => fetch(`/api/changeuserphoto/${userId}`, {
    method: 'put',
    body: data,
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      if (body.message) {
        throw new Error(body.message);
      }
      return body.user;
    }),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    disableHelpMessage: (state) => {
      state.helpMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line no-unused-vars
      .addCase(loadUser.rejected, (state, action) => {
        // console.log(action);
        // console.log(action.error);
        // console.log(action.error.message);
        state.isUser = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isUser = true;
        state.data = action.payload;
        // console.log(state);
        // console.log(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isUser = true;
        state.data = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isUser = false;
        state.data = {
          id: null,
          email: null,
          login: null,
          displayName: null,
          photo: null,
          age: null,
          sex: null,
          city: null,
          about: null,
          tgUsername: null,
          isAdmin: null,
        };
      })
      .addCase(regUser.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.isUser = true;
        state.data = action.payload;
      })
      .addCase(changeUser.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(changeUser.fulfilled, (state, action) => {
        state.helpMessage = 'Данные пользователя успешно обновлены';
        state.data = action.payload;
      })
      .addCase(changeUserPass.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(changeUserPass.fulfilled, (state, action) => {
        state.helpMessage = 'Данные пользователя успешно обновлены';
        state.data = action.payload;
      })
      .addCase(changeUserPhoto.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(changeUserPhoto.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

// Экспорт reducer-функции
export default userSlice.reducer;

// Экспорт action creator-функций
export const { disableHelpMessage } = userSlice.actions;

// Экспорт action creator-функций (thunk)
export {
  loadUser, loginUser, logoutUser, regUser, changeUser, changeUserPass, changeUserPhoto,
};

/* eslint-enable no-param-reassign */
