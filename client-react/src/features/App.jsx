import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Layout/Layout.jsx';
import Home from './Home/Home.jsx';
import Registration from './Registration/Registration.jsx';
import Login from './Login/Login.jsx';
import AddCard from '../AddCard/AddCard.jsx';
import './App.css';

import { loadUser } from '../store/userSlice/userSlice';

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
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myplace" element={<AddCard />} />
      </Route>
    </Routes>
  );
}

export default App;
