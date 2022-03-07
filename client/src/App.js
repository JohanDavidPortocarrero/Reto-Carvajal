import './Styles/App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* State */
import ToggleState from './Context/Toggle/ToggleState';
import UsuarioState from './Context/Usuarios/usuariosState'

/* Componentes */
import Menu from './Components/Menu/Menu';
import WishList from './Components/WishList/wishList';
import WishListState from './Context/Wish_lists/wishListState';
import ProductoState from './Context/Productos/productoState'
import LogIn from './Components/Login/LogIn';
import Register from './Components/Login/Register';


function App() {
  return (
    <ToggleState>
      <UsuarioState>
        <ProductoState >
          <WishListState>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/wishlist" element={<WishList />} />
              </Routes>
            </BrowserRouter>
          </WishListState>
        </ProductoState>
      </UsuarioState>
    </ToggleState>
  );
}

export default App;
