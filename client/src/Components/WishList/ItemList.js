import React, { useState, useContext, useEffect } from 'react'
import Swal from 'sweetalert2';

import '../../Styles/WishList/itemList.css';
import '../../Styles/WishList/mediaItem.css';

import WishListContext from '../../Context/Wish_lists/wishListContext';
import ProdcutoContext from '../../Context/Productos/productoContext';

export default function ItemList(props) {

  let [activeOpcion, setOpcion] = useState(false);
  let [datoProducto, setDatoProducto] = useState();

  const productoContext = useContext(ProdcutoContext);
  const {
    productosList,
    productoActive,
    obtenerProductos,
    obtenerProducto
  } = productoContext;

  const wishListContext = useContext(WishListContext);
  const { 
    listWish,
    obtenerWishList,
    actualizarWishList,
    actualizarItemWishList,
    deleteItemWishList
  } = wishListContext;

  useEffect(() => {
    obtenerProductos()
    obtenerWishList(props.usuario.id);

    let datofilter = productosList.filter( elem => elem.id === props.item.id_producto )
    if( datofilter[0].cantidad_stack < props.item.cantidad_producto && datofilter[0].cantidad_stack > 0 ){
      Swal.fire({
        title: 'La cantidad del producto a disminuido del stack\ndesea actualizar o eliminar',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Actualizar',
        denyButtonText: `Eliminar`,
      }).then((result) => {
        if (result.isConfirmed) {

          actualizarItemWishList({
            id: props.item.id,
            id_producto: props.item.id_producto,
            id_wish_list: props.item.id_wish_list,
            cantidad_producto: datoProducto.cantidad_stack,
            fecha_agregada: new Date()
          }, props.item.id);

        } else if (result.isDenied) {
          deleteItemWishList(props.item.id);

          actualizarWishList({
            id: listWish[0].id, 
            id_user: listWish[0].id_user,
            total_productos: listWish[0].total_productos - 1,
            pago_total: listWish[0].pago_total - (datoProducto.precio*props.item.cantidad_producto),
            estado: listWish[0].estado
          }, listWish[0].id);

          Swal.fire({
            icon: 'success',
            title: 'Producto Eliminado',
            showConfirmButton: true,
            timer: 3000,
          })
        }
      })
    }
    else if(datofilter[0].cantidad_stack <= 0){
      Swal.fire({
        icon: 'success',
        title: 'Ya no quedan unidades del producto ' + datofilter[0].nombre,
        showConfirmButton: true,
        timer: 3000,
      })
    }

  }, []);

  const obtenerDatosItem = () => {
    if( productosList.length > 0 ){

      let datofilter = productosList.filter( elem => elem.id === props.item.id_producto )

      if( datofilter ){
        setDatoProducto(datofilter[0]);
      }
      else{
        setDatoProducto({
          nombre: '',
          precio: 0,
          categoria: ''
        });
      }

    }
    else{
      setDatoProducto({
        nombre: '',
        precio: 0,
        categoria: ''
      });
    }

  }

  useEffect(() => {
    obtenerDatosItem()
  }, []);

  const actualizarListItem = (accion) => {
    if( accion === 'del' ){
      deleteItemWishList(props.item.id);
      actualizarWishList({
        id: listWish[0].id, 
        id_user: listWish[0].id_user,
        total_productos: listWish[0].total_productos - 1,
        pago_total: listWish[0].pago_total - (datoProducto.precio*props.item.cantidad_producto),
        estado: listWish[0].estado
      }, listWish[0].id);
    }
    else if( accion === 'inc' ){
      if( props.item.cantidad_producto + 1 > datoProducto.cantidad_stack ){
        actualizarItemWishList({
          id: props.item.id,
          id_producto: props.item.id_producto,
          id_wish_list: props.item.id_wish_list,
          cantidad_producto: datoProducto.cantidad_stack,
          fecha_agregada: new Date()
        }, props.item.id);
      }
      else{
        actualizarItemWishList({
          id: props.item.id,
          id_producto: props.item.id_producto,
          id_wish_list: props.item.id_wish_list,
          cantidad_producto: props.item.cantidad_producto + 1,
          fecha_agregada: new Date()
        }, props.item.id);

        actualizarWishList({
          id: listWish[0].id, 
          id_user: listWish[0].id_user,
          total_productos: listWish[0].total_productos + 1,
          pago_total: listWish[0].pago_total + datoProducto.precio,
          estado: listWish[0].estado
        }, listWish[0].id);
      }
    }
    else if( accion === 'dec' ){
      if( props.item.cantidad_producto - 1 <= 0 ){
        
        Swal.fire({
          title: 'Desea eliminar el producto de la lista',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            deleteItemWishList(props.item.id);

            actualizarWishList({
              id: listWish[0].id, 
              id_user: listWish[0].id_user,
              total_productos: listWish[0].total_productos - 1,
              pago_total: listWish[0].pago_total - datoProducto.precio,
              estado: listWish[0].estado
            }, listWish[0].id);

            Swal.fire({
              icon: 'success',
              title: 'Producto Eliminado',
              showConfirmButton: true,
              timer: 3000,
            })
          } 
        })

      }
      else{
        actualizarItemWishList({
          id: props.item.id,
          id_producto: props.item.id_producto,
          id_wish_list: props.item.id_wish_list,
          cantidad_producto: props.item.cantidad_producto - 1,
          fecha_agregada: new Date()
        }, props.item.id);

        actualizarWishList({
          id: listWish[0].id, 
          id_user: listWish[0].id_user,
          total_productos: listWish[0].total_productos - 1,
          pago_total: listWish[0].pago_total - datoProducto.precio,
          estado: listWish[0].estado
        }, listWish[0].id);
      }
      
    }
  }

  const itemWL = () => {
    if( datoProducto ){
      return <div className={activeOpcion ? 'ItemList active' : 'ItemList'}>
        <div className='TitleItem' onClick={() => setOpcion(!activeOpcion)}>
          <h1>{datoProducto.nombre}</h1>
          <button onClick={() => setOpcion(!activeOpcion)}>
            {
              activeOpcion
              ? <ion-icon name="chevron-up-outline"></ion-icon>
              : <ion-icon name="chevron-down-outline"></ion-icon>
            }
            
          </button>
        </div>
        <div 
          className={ activeOpcion ? 'opcionItem' : 'opcionItem active' }
        >
          <p className='catg'>{datoProducto.categoria}</p>
          <p className='decData'>{'$'+datoProducto.precio}</p>
          <p className='decData'>{props.item.cantidad_producto}</p>
          <p className='decData'>{'SubTotal: $'+(datoProducto.precio*props.item.cantidad_producto)}</p>
          <div className='btnAccion'>
            <button onClick={actualizarListItem.bind(this, 'inc')}> 
              <ion-icon name="bag-add-outline"></ion-icon>
            </button>
            <button onClick={actualizarListItem.bind(this, 'del')}> 
              <ion-icon name="trash-outline"></ion-icon>  
            </button>
            <button onClick={actualizarListItem.bind(this, 'dec')}> 
              <ion-icon name="bag-remove-outline"></ion-icon>
            </button>
          </div>
          <p className='descProduct'>{datoProducto.descripcion}</p>
        </div>
      </div>
    }
    else{
      return <>
      </>
    }
  }

  
  return <>{itemWL()}</>
}
