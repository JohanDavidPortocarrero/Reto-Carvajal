/* eslint-disable import/no-anonymous-default-export */
import {
    OBTENER_PRODUCTOS
} from '../type';

export default (state, action) => {
    const {payload, type} = action

    switch(type){
        case OBTENER_PRODUCTOS:
            return {
                ...state,
                productosList: payload
            }
        default:
            return state;
    }

}