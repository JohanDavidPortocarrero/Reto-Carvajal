/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, {
    useReducer
} from 'react'
import axios from 'axios'

import WishListContext from './wishListContext'
import wishListReducer from './wishListReducer'

const WishListState = (props) => {
    const inicialState = {
        wLCargardo: true,
        listWish: []
    }

    const [state, dispatch] = useReducer(wishListReducer, inicialState)

    const obtenerWishList = async (id) => {
        try {

            const res = await axios.get('https://back-orm-bd-rcarvajal.herokuapp.com/wishlist/'+id);
            console.log(res.data)
            dispatch({
                type: 'OBTENER_WISH_LIST',
                payload: res.data
            })

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch({
                type: 'CARGANDO_WISH_LIST',
                payload: false
            })
        }
    }

    const createWishList = async ( dato ) => {
        try {

            const res = await axios.post('https://back-orm-bd-rcarvajal.herokuapp.com/wishlist/', dato);
            //console.log(res)
            dispatch({
                type: 'CREAR_WISH_LIST',
                payload: dato
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const addWishList = async (datos) => {
        try {
            
            const res = await axios.post('https://back-orm-bd-rcarvajal.herokuapp.com/itemwishlist/', datos);
            //console.log(res)
            //console.log(datos)
            dispatch({
                type: 'ADD_ITEM_WISH_LIST',
                payload: datos
            })

        } catch (error) {
            console.log(error)
        }
    }

    const actualizarWishList = async (datos, id) => {
        try {
            
            const res = await axios.put('https://back-orm-bd-rcarvajal.herokuapp.com/wishlist/'+id, datos);
            //console.log(res.data)
            dispatch({
                type: 'ACTUALIZAR_WISH_LIST',
                payload: datos
            })

        } catch (error) {
            console.log(error)
        }
    }

    const actualizarItemWishList = async (datos, id) => {
        try {
            
            const res = await axios.put('https://back-orm-bd-rcarvajal.herokuapp.com/itemwishlist/'+id, datos);
            ///console.log(res.data)
            dispatch({
                type: 'ACTUALIZAR_ITEM_WISH_LIST',
                payload: datos
            })

        } catch (error) {
            console.log(error)
        }
    }

    const deleteItemWishList = async (id) => {
        try {
            
            const res = await axios.delete('https://back-orm-bd-rcarvajal.herokuapp.com/itemwishlist/'+id);
            //console.log(res.data)
            dispatch({
                type: 'ELIMINAR_ITEM_WISH_LIST',
                payload: id
            })

        } catch (error) {
            console.log(error)
        }
    }

    const deleteWishList = async (id) => {
        try {
            
            const res = await axios.delete('https://back-orm-bd-rcarvajal.herokuapp.com/wishlistproduct/'+id);
            //console.log(res.data)
            dispatch({
                type: 'ELIMINAR_WISH_LIST',
                payload: []
            })

        } catch (error) {
            console.log(error)
        }
    }


    return ( <WishListContext.Provider value = {
            {
                listWish: state.listWish,
                wLCargardo: state.wLCargardo,
                obtenerWishList,
                addWishList,
                createWishList,
                actualizarWishList,
                actualizarItemWishList,
                deleteItemWishList,
                deleteWishList,
            }
        } > {
            props.children
        } </WishListContext.Provider>
    )
}

export default WishListState