/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from 'react'
import Swal from 'sweetalert2';

import '../../Styles/WishList/wishList.css';
import '../../Styles/WishList/mediaWishList.css';

/* Context */
import ToggleContext from '../../Context/Toggle/ToggleContext';
import ProdcutoContext from '../../Context/Productos/productoContext';
import UsuariosContext from '../../Context/Usuarios/usuariosContext';
import WishListContext from '../../Context/Wish_lists/wishListContext';

/* Componentes */
import Toggle from '../Toggle'
import ItemList from './ItemList';

export default function WishList(props) {

  const toggleContext = useContext(ToggleContext);
  const { activeToggle, onOffToggle } = toggleContext;
  let [minMaxRecibo1, setMinMaxRecibo1] = useState(false);
  let [minMaxRecibo2, setMinMaxRecibo2] = useState(false);

  const usuarioContext = useContext(UsuariosContext);
  const { 
    usuarioAutenticado, 
    datosUsuario, 
    verificarInicioSecion, 
    userCargando 
  } = usuarioContext;

  const wishListContext = useContext(WishListContext);
  const { 
    wLCargardo,
    listWish,
    obtenerWishList,
    createWishList,
    actualizarWishList
  } = wishListContext;

  const productoContext = useContext(ProdcutoContext);
  const {
    obtenerProductos
  } = productoContext;

  useEffect(() => {
    verificarInicioSecion();
    obtenerProductos();
  }, []);

  if( !usuarioAutenticado && !userCargando ){ 
    Swal.fire({
      icon: 'error',
      title: 'Debes iniciar secion',
      showConfirmButton: false,
      timer: 3000,
    }).then(() => {
      window.location = "/login";
    } )
    
    return <></>
  }
  else{
    if( !userCargando ){
      obtenerWishList(datosUsuario.id);
    }
  }

  const confirmarCompra = () => {

    actualizarWishList({
      id: listWish[0].id, 
      id_user: listWish[0].id_user,
      total_productos: listWish[0].total_productos,
      pago_total: listWish[0].pago_total,
      estado: false
    }, listWish[0].id);

    createWishList({
      id_user: listWish[0].id_user,
      total_productos: 0,
      pago_total: 0,
      estado: true
    })

    Swal.fire({
      icon: 'success',
      title: 'Compra finalizada',
      showConfirmButton: false,
      timer: 3000,
    }) 

  }

  return (
    <div className='bodyWish'>
        <Toggle active = {activeToggle} />
        <div className={activeToggle ? 'wishBody activeT' : 'wishBody'}>
          <div className='headToggle'>
            <button onClick={ () => onOffToggle() }>
              <ion-icon name="menu-outline"></ion-icon>
            </button>
          </div>
          <div className='contTitle'>
            <h1>Wish List</h1>
          </div>
          <div className='contetRecibos'>
            <div className={ minMaxRecibo1 ? 'contListProduct minimizar' : 'contListProduct' }>
              <div className='headRecibo'>
                <button onClick={ () => {
                  setMinMaxRecibo1( minMaxRecibo1 = !minMaxRecibo1 )
                } }>
                  { minMaxRecibo1 
                    ? <ion-icon name="caret-down-outline"></ion-icon> 
                    : <ion-icon name="caret-up-outline"></ion-icon> }
                </button>
                <h1>Productos Agregados</h1>
              </div>
              {
                wLCargardo
                  ? <p className='loading' >loading...</p>
                  :<div className='bodyRecibo'>
                    {
                      listWish.length !== 0 
                      ? listWish[0].item.map( elem =>{
                        if( elem !== null ){
                          return <ItemList item={elem} key={elem.id} usuario = {datosUsuario} />
                        }
                        } )
                      : <></>
                    }
                  </div>
              }
            </div>
            <div className={ minMaxRecibo2 ? 'contMiniFactura minimizar' : 'contMiniFactura' }>
              <div className='headRecibo'>
                <button onClick={ () => {
                  setMinMaxRecibo2( minMaxRecibo2 = !minMaxRecibo2 )
                } }>
                  { minMaxRecibo2 
                    ? <ion-icon name="caret-down-outline"></ion-icon>
                    : <ion-icon name="caret-up-outline"></ion-icon> }
                </button>
                <h1>Factura</h1>
              </div>
              <div className='bodyRecibo'>
                <div className='zonaData'>
                  <p>
                    {
                      listWish.length !== 0 
                      ? '$'+listWish[0].pago_total
                      : ''
                    }
                  </p>
                </div>
                <div className='zonaBoton'>
                  <button onClick={() => confirmarCompra()}>COMPRAR</button>
                </div>
              </div>
            </div>
          </div>
          <div className='btnConfirmar'>
            <button onClick={() => confirmarCompra()}>COMPRAR</button>
          </div>
        </div>
    </div>
  )
}
