/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'

import '../../Styles/Menu/modalContainer.css';
import '../../Styles/Menu/mediaModal.css';

import iconDefaul from '../../Assets/carvajal.jpg';
import WishListContext from '../../Context/Wish_lists/wishListContext';
import Swal from 'sweetalert2';

export default function ModalProducto(props) {

    let dato = props.dato;
    const [cantidad, setCantidad] = useState(1);

    const wishListContext = useContext(WishListContext);
    const { 
        listWish,
        obtenerWishList,
        addWishList,
        actualizarWishList,
        actualizarItemWishList
    } = wishListContext;

    useEffect(() => {
        obtenerWishList(props.usuario.id);
    }, []);
    
    const agregarAlCarrito = () => {

        console.log(listWish);
        if( listWish.length > 0 ){
            let datosFilter = listWish[0].item.filter( elem => elem !== null && elem.id_producto === dato.id );
            
            if( datosFilter.length !== 0 ){
                actualizarItemWishList({
                    id: datosFilter[0].id,
                    id_producto: datosFilter[0].id_producto,
                    id_wish_list: datosFilter[0].id_wish_list,
                    cantidad_producto: datosFilter[0].cantidad_producto + parseInt(cantidad, 10),
                    fecha_agregada: new Date()
                }, datosFilter[0].id);

                actualizarWishList({
                    id: listWish[0].id, 
                    id_user: listWish[0].id_user,
                    total_productos: listWish[0].total_productos,
                    pago_total: listWish[0].pago_total + ( datosFilter[0].precio * parseInt(cantidad, 10) ),
                    estado: listWish[0].estado
                }, listWish[0].id);
            }
            else{

                addWishList({
                    id_producto: dato.id,
                    id_wish_list: listWish[0].id,
                    cantidad_producto: parseInt(cantidad, 10),
                    fecha_agregada: new Date()
                })

                actualizarWishList({
                    id: listWish[0].id, 
                    id_user: listWish[0].id_user,
                    total_productos: listWish[0].total_productos + 1,
                    pago_total: listWish[0].pago_total + ( dato.precio * parseInt(cantidad, 10) ),
                    estado: listWish[0].estado
                }, listWish[0].id);

            }

        }

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado con Exito',
            showConfirmButton: false,
            timer: 3000,
        }) 
    }

    const onChage = (e) => {
        if( e.target.value > dato.cantidad_stack ){
            setCantidad(dato.cantidad_stack);
        }
        else if( e.target.value < 1 ){
            setCantidad(1);
        }
        else{
            setCantidad(e.target.value);
        }
    }

    const cerrarModal = () => {
        props.setModal()
    }

    return (
        <div className='modalContainer'>
            <div className='modal'>
                <div className='contClosebtn'>
                    <button className='closeBtn' onClickCapture={cerrarModal}>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
                <div className='contZonasModal'>
                    <div className='contImagen'>
                        <img src={iconDefaul} alt=''></img>
                    </div>
                    <div className='contInfo'>              
                        <h1>{dato.nombre}</h1>
                        <div className='contZonas'>
                            <div className='zonaProducto'>
                                <h3>Categoria: <p>{dato.categoria}</p></h3>
                                <h3>Unidades Disponible: <p>{dato.cantidad_stack}</p></h3>
                            </div>
                            <div className='zonaAgregar'>
                                <p className='precio'>{'$'+dato.precio}</p>
                                <p className='total'>{'Total: $'+ ( cantidad * dato.precio)}</p>
                                <div className='inputCantidad'>
                                    <p> Quiero </p>
                                    <input 
                                        type='number' 
                                        name='cantidad' 
                                        value={cantidad} 
                                        onChange={onChage}
                                        placeholder='1'></input>
                                    <p>Unidades / {dato.cantidad_stack}</p>
                                </div>
                                <div className='contBtnAdd'>
                                    <button onClickCapture={ () => {
                                        agregarAlCarrito()
                                        cerrarModal()
                                    }}>AGREGAR AL CARRITO</button>
                                </div>
                            </div>
                            <div className='zonaComentarios'></div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
  )
}
