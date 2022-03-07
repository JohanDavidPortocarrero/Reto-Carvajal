import React, {useReducer} from 'react'

import ToggleContext from './ToggleContext';
import ToggleReducer from './ToggleReducer';

const ToggleState = (props) => {
    const inicialState = {
        activeToggle: false,
        pagina: window.localStorage.getItem('paginaActiva'),
    }

    const [state, dispatch] = useReducer(ToggleReducer, inicialState)

    const onOffToggle = () => {
        dispatch({
            type: 'ACTIVE_TOGGLE',
            payload: !state.activeToggle
        })
    }

    const cambiarPagina = (pag) => {

        try {
            window.localStorage.setItem('paginaActiva', pag)
        } catch (error) {
            console.log(error)
        }
   
        dispatch({
            type: 'CAMBIAR_PAGINA',
            payload: pag
        })
    }

    return (
        <ToggleContext.Provider value={{
            activeToggle: state.activeToggle,
            pagina: state.pagina,
            onOffToggle,
            cambiarPagina
        }}>
            {props.children}
        </ToggleContext.Provider>
    )
}


export default ToggleState;