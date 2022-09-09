import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import Home from './Home/Home.jsx';
import Registration from './Registration/Registration.jsx';
import Login from './Login/Login.jsx';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
  );
}

export default App;
