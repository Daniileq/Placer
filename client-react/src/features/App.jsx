import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Layout/Layout.jsx';
import Home from './Home/Home.jsx';
import Registration from './Registration/Registration.jsx';
import Login from './Login/Login.jsx';
import UserPage from './UserPage/UserPage.jsx';
import UserSettingsPage from './UserSettingsPage/UserSettingsPage.jsx';
import FavoritesPage from './FavoritesPage/FavoritesPage.jsx';
import About from './About/About.jsx';
import Contacts from './Contacts/Contacts.jsx';
import Error404 from './ErrorPages/Error404/Error404.jsx';
import PlacesToGo from './PlacesToGo/PlacesToGo.jsx';

import './App.css';

import { loadUser } from '../store/userSlice/userSlice';
import PlacePage from './PlacePage/PlacePage.jsx';
import AddPlacePage from './AddPlacePage/AddPlacePage.jsx';
import { loadFavorites, loadPlacesToGo } from '../store/placesSlice/placesSliceDeprecated';
import Loader from './Loader/Loader.jsx';

function App() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (isUser) {
      dispatch(loadFavorites());
      dispatch(loadPlacesToGo());
    }
  }, [dispatch, isUser]);

  if (isUser === null) {
    return <Loader />;
  }

  return (
    <>
    {isUser
      ? (<Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<UserPage />} /> */}
          <Route path="/places/:id" element={<PlacePage />} />
          <Route path="/newplace" element={<AddPlacePage />} />
          <Route path='/settings' element={<UserSettingsPage/>} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/togo" element={<PlacesToGo />} />
          <Route path='/:login' element={<UserPage />} />
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>) : (<Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/places/:id" element={<PlacePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/togo" element={<PlacesToGo />} />
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>)
    }
    </>
  );
}

export default App;
