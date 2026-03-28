import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/products/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/products/Home';
import Admin from './components/admin/Admin';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import UserController from './components/user/UserController';
import Search from './components/search/Search';
import Cart from './components/cart/Cart';

const App = () => {

  return (

    <div>
      <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Products />} />
          <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
          <Route path='/user' element={
            <ProtectedRoute>
              <UserController/>
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/search/:keyword' element={<Search/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App






