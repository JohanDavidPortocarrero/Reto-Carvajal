/* eslint-disable import/no-anonymous-default-export */
import {
    OBTENER_WISH_LIST,
    ACTUALIZAR_WISH_LIST,
    ACTUALIZAR_ITEM_WISH_LIST,
    ELIMINAR_ITEM_WISH_LIST,
    ELIMINAR_WISH_LIST,
    CREAR_WISH_LIST,
    ADD_ITEM_WISH_LIST,
    CARGANDO_WISH_LIST
} from '../type';

export default (state, action) => {
    const {payload, type} = action

    switch(type){
        case OBTENER_WISH_LIST:
            return {
                ...state,
                listWish: payload
            }
        case ACTUALIZAR_ITEM_WISH_LIST: 
            return {
                ...state,
                listWish:[{
                    id: state.listWish[0].id,
                    id_user: state.listWish[0].id_user,
                    total_productos: state.listWish[0].total_productos,
                    pago_total: state.listWish[0].pago_total,
                    estado: state.listWish[0].estado,
                    item: state.listWish[0].item.map( dato => {
                        if( dato.id === payload.id ){
                            return payload;
                        }
                        return dato;
                    } )
                }]
            }
        case ACTUALIZAR_WISH_LIST:
            return {
                ...state,
                listWish:[{
                    id: payload.id,
                    id_user: payload.id_user,
                    total_productos: payload.total_productos,
                    pago_total: payload.pago_total,
                    estado: payload.estado,
                    item: state.listWish[0].item
                }]
            }
        case ELIMINAR_WISH_LIST:
            return {
                ...state,
                listWish: payload
            }
        case ELIMINAR_ITEM_WISH_LIST:
            return {
                ...state,
                listWish:[{
                    id: state.listWish[0].id,
                    id_user: state.listWish[0].id_user,
                    total_productos: state.listWish[0].total_productos,
                    pago_total: state.listWish[0].pago_total,
                    estado: state.listWish[0].estado,
                    item: state.listWish[0].item.filter( dato => dato.id !== payload )
                }]
            }
        case CREAR_WISH_LIST:
            return {
                ...state,
                listWish: [{
                    id: payload.id,
                    id_user: payload.id_user,
                    total_productos: payload.total_productos,
                    pago_total: payload.pago_total,
                    estado: payload.estado,
                    item: []
                }]
            }
        case ADD_ITEM_WISH_LIST:
            return {
                ...state,
                listWish:[{
                    id: state.listWish[0].id,
                    id_user: state.listWish[0].id_user,
                    total_productos: state.listWish[0].total_productos,
                    pago_total: state.listWish[0].pago_total,
                    estado: state.listWish[0].estado,
                    item: [...state.listWish[0].item, payload]
                }]
            }
        case CARGANDO_WISH_LIST:
            return {
                ...state,
                wLCargardo: payload
            }
        default:
            return state;
    }

}