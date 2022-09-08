import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import {
  loadTest,
  getUserLogin,
} from '../../store/userSlice/userSlice';

function Home() {
  const dispatch = useDispatch();
  const login = useSelector(getUserLogin);

  useEffect(() => {
    dispatch(loadTest());
  }, [dispatch]);

  return (
    <div>
      <h1>Placer</h1>
      <h2>Welcome to the New Place</h2>
      <p>{login}</p>
    </div>
  );
}

export default Home;
