import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'
import Foter from './components/Foter'
import Error from './Pages/Error'
import Cart from './Pages/Cart/Cart'
import Login from './Pages/Login/Login'
import Products from './Pages/Products'
import RequireAuth from './router/RequireAuth'
import UserPanel from './Pages/UserPanel/UserPanel'
import RequireAdminRole from './router/RequireAdminRole'
import BuildYourPc from './Pages/BuildYourPc/BuildYourPc'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} errorElement={<Error />} />
          <Route path='/carrito' element={<Cart />} errorElement={<Error />} />
          <Route path='/login' element={<Login />} errorElement={<Error />} />
          <Route path='/productos' element={<Products />} errorElement={<Error />} />
          <Route path='/armatupc' element={<BuildYourPc />} errorElement={<Error />} />
          <Route element={<RequireAuth />}>
            <Route path='/user_panel' element={<UserPanel />} errorElement={<Error />} />
          </Route>
          <Route element={<RequireAdminRole />}>
            <Route path='/dashboard' element={<UserPanel />} errorElement={<Error />} />
          </Route>
        </Routes>
      <Foter />
    </BrowserRouter>
  )
}

export default App
