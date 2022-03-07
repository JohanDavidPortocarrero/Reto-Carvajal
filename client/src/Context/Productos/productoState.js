import React, {useReducer} from 'react'
import axios from 'axios'

import ProductoContext from './productoContext'
import productoReducer from './productoReducer'

const ProductoState = (props) => {
    const inicialState = {
        productosList: []
    }

    const [state, dispatch] = useReducer(productoReducer, inicialState)

    const obtenerProductos = async () => {
        try{

            const res = await axios.get('https://back-orm-bd-rcarvajal.herokuapp.com/productos/');
            //console.log(res.data)
            dispatch({
                type: 'OBTENER_PRODUCTOS',
                payload: res.data
            })

        }catch(e){
            console.log(e)
        }
    }

    return (
        <ProductoContext.Provider value={{
            productosList: state.productosList,
            obtenerProductos
        }}>
            {props.children}
        </ProductoContext.Provider>
    )
}

export default ProductoState