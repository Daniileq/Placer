import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import Home from './Home/Home.jsx';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
        </Route>
      </Routes>
  );
}

export default App;
