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
import Error404 from './ErrorPages/Error404/Error404.jsx';
import AnotherError from './ErrorPages/AnotherError/AnotherError.jsx';
// import PlacesToGo from './PlacesToGo/PlacesToGo.jsx';

import './App.css';

import { loadUser } from '../store/userSlice/userSlice';
import PlacePage from './PlacePage/PlacePage.jsx';
import AddPlacePage from './AddPlacePage/AddPlacePage.jsx';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const isUser = useSelector((state) => state.user.isUser);

  if (isUser === null) {
    return <div>...loading</div>;
  }

  return (
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/newplace" element={<AddPlacePage />} />
          <Route path='/settings' element={<UserSettingsPage/>} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/something_wrong' element={<AnotherError />} />
          {/* <Route path="/places_to_go" element={<PlacesToGo />} /> */}
        </Route>
      </Routes>
  );
}

export default App;
