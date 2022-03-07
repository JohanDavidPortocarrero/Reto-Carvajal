/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react'
import {Link} from "react-router-dom";

/* Style */
import '../../Styles/toggle.css';

/* Context */
import ToggleContext from '../../Context/Toggle/ToggleContext';
import UsuariosContext from '../../Context/Usuarios/usuariosContext';

export default function Toggle( props ) {

  const toggleContext = useContext(ToggleContext);
  const { activeToggle, onOffToggle, pagina, cambiarPagina } = toggleContext;

  const usuariosContext = useContext(UsuariosContext);
  const {cerrarSecion} = usuariosContext

  return (
    <div className={ activeToggle ? 'bodyToggle active' : 'bodyToggle' }>
      <div className='contBtnClose'>
        <button className='closeToggle' onClick={ () => onOffToggle() }>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
      </div>
        <ul>
          <li>
            <Link 
              to="/menu" 
              className={pagina === 'menu' ? 'Link active' : 'Link'} 
              onClick={() => cambiarPagina('menu')}
            >
              <ion-icon name="storefront-outline"></ion-icon>
              <span>Menu</span>
            </Link> 
          </li>
          <li>
            <Link 
              to="/wishlist" 
              className={pagina === 'wishlist' ? 'Link active' : 'Link'} 
              onClick={() => cambiarPagina('wishlist')}
            >
              <ion-icon name="cart-outline"></ion-icon>
              <span>Wish List</span>
            </Link> 
          </li>
          <li>
            <button 
              className={pagina === 'logout' ? 'Link active' : 'Link'} 
              onClick={() => {
                cerrarSecion()
                window.location = "/login";
              }}
              >
              <ion-icon name="log-out-outline"></ion-icon>
              <span>Log out</span>
            </button>
          </li>
        </ul>
    </div>
  )
}
