import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import User from './pages/User';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  const token = cookies.get('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={token ? <Home /> : <Login />} />
        <Route path='/register' element={token ? <Home /> : <Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/user' element={token ? <User /> : <Login />} />
        <Route path='/product/:id' element={<Detail />} />
        <Route path='/cart/' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
