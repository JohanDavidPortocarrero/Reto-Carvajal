/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import '../../Styles/Menu/producto.css';
import '../../Styles/Menu/mediaMenu.css';

import iconDefaul from '../../Assets/carvajal.jpg';
import ModalProducto from './ModalProducto';

export default function Producto(props) {

  let [ activeModal, setModal ] = useState(false);

  const desactiverModal = () => {
    setModal(activeModal = false)
  }

  const OpenModal = () => {
    if( activeModal ){
      return <ModalProducto key={props.dato.id} dato = {props.dato} setModal={desactiverModal} usuario = {props.usuario} />
    }
    else{
      return <></>
    }
  }

  return (
    <div className='CardProdcuto' onClick={() => setModal(activeModal = true)}>
      <div className='contImg'>
        <img src={iconDefaul} alt='../'></img>
      </div>
      <div className='contOpcion'>
        <h1>{props.dato.nombre}</h1>
        <h2>{props.dato.precio}</h2>
      </div>
      {
        OpenModal()
      }
    </div>
  )
}
