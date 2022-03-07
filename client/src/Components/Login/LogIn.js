import React, { useState, useContext, useEffect } from 'react'
import {Link} from "react-router-dom";

import '../../Styles/Login/login.css'
import '../../Styles/Login/mediaLogin.css'
import Swal from 'sweetalert2';
import iconDefaul from '../../Assets/carvajal.jpg';
import UsuariosContext from '../../Context/Usuarios/usuariosContext';
import ToggleContext from '../../Context/Toggle/ToggleContext';

export default function LogIn() {

  const usuarioContext = useContext(UsuariosContext);
  const { autenticarUsuario, usuarioAutenticado, userCargando } = usuarioContext;

  const toggleContext = useContext(ToggleContext);
  const { cambiarPagina } = toggleContext;

  let [state, setState] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const elem = window.localStorage.getItem('usuario')
    const dato = elem ? JSON.parse(elem) : null
    if( dato != null ){
      window.location = "/menu";
    }
  }, [])

  const onChage = (e, tip) => {
    if( tip === 'pass' ){
      setState({
        email: state.email,
        password : e.target.value
      })
    }
    else{
      setState({
        email: e.target.value,
        password : state.password
      })
    }
    
  }

  if( usuarioAutenticado ){
    try {

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        cambiarPagina('menu')
      }).then(() => {
        window.localStorage.setItem('usuario', JSON.stringify(state))
        window.location = "/menu";
      }) 

    } catch (error) {
      console.log(error)
    }

  }

  const ingresar = () => {
    autenticarUsuario(state).then(() => {
      if( !usuarioAutenticado && !userCargando ){
        Swal.fire({
          icon: 'error',
          title: 'El usuario no existe',
          showConfirmButton: false,
          timer: 3000,
        })
      } 
    })
  }

  return (
    <div className='bodyLogin' >
      
      <div className='contLogin'>
        <h1>LOG IN</h1>
        <div className='contForm'>
          <div className='contInput'>

            <div>
              <div className='icon'>
                <ion-icon name="person"></ion-icon>
              </div>
              <input 
                type="email" 
                name="email"
                placeholder='Email'
                onChange={ e => onChage(e, 'email')}
                value={state.email} />
            </div>
            <div>
              <div className='icon'>
                <ion-icon name="lock-closed"></ion-icon>
              </div>
              <input 
                type="password" 
                name="password"
                placeholder='Contraseña'
                onChange={ e => onChage(e, 'pass')}
                value={state.password} />
            </div>
            
          </div>
          <div className='contButton'>
            <button onClick={ () => {
              ingresar()
            } } >Log IN</button>
            <Link to='/register' className='goRegister'>
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>

      <div className='imagenLog'>
        <img src={iconDefaul} alt="../"></img>
      </div>

    </div>
  )
}
