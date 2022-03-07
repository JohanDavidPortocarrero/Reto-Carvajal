/* eslint-disable import/no-anonymous-default-export */
import {
    ACTIVE_TOGGLE,
    CAMBIAR_PAGINA
} from '../type';

export default (state, action) => {
    const {payload, type} = action

    switch(type){
        case ACTIVE_TOGGLE:
            return {
                ...state,
                activeToggle: payload
            }
        case CAMBIAR_PAGINA:
            return {
                ...state,
                pagina: payload
            }
        default:
            return state;
    }

}