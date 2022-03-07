/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from 'react'

import '../../Styles/Menu/menu.css';
import '../../Styles/Menu/mediaMenu.css';

import ToggleContext from '../../Context/Toggle/ToggleContext';
import ProdcutoContext from '../../Context/Productos/productoContext';
import UsuariosContext from '../../Context/Usuarios/usuariosContext';
import Swal from 'sweetalert2';

import Toggle from '../Toggle/index'
import Producto from './Producto';

export default function Menu() {

    const toggleContext = useContext(ToggleContext);
    const { activeToggle, onOffToggle } = toggleContext;

    const usuarioContext = useContext(UsuariosContext);
    const { usuarioAutenticado, datosUsuario, verificarInicioSecion, userCargando } = usuarioContext;

    const productoContext = useContext(ProdcutoContext);
    const {
        productosList,
        obtenerProductos
    } = productoContext;

    useEffect(() => {
        verificarInicioSecion();
        obtenerProductos();
        console.log( datosUsuario )
        const elem = window.localStorage.getItem('usuario')
        const dato = elem ? JSON.parse(elem) : null
        if( dato === null ){
            Swal.fire({
                icon: 'error',
                title: 'Debes iniciar secion',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                window.location = "/login";
            } )
        }
    }, []);

  return (
    <div className='bodyMenu'>
        <Toggle active = {activeToggle} />
        <div className={activeToggle ? 'menubody activeT' : 'menubody'}>
            <div className='headToggle'>
                <button onClick={ () => onOffToggle() }>
                    <ion-icon name="menu-outline"></ion-icon>
                </button>
            </div>
            <div className='contTitle'>
                <h1>Productos</h1>
            </div>
            <div className='contenedorListado'>
                <div className='contProdcutos'>
                    <button className='btnfiltro'>
                        <ion-icon name="filter-outline"></ion-icon>
                    </button>
                    <div className='listadoMenu'>
                        {
                            productosList.map( ( dato ) => {
                                if( dato.cantidad_stack > 0 ){
                                    return <Producto key={dato.id} dato = {dato} usuario = {datosUsuario} />
                                }
                            } )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
