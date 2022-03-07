import React, { useState, useContext } from 'react'
import {Link} from "react-router-dom";

import '../../Styles/Login/Register.css'
import Swal from 'sweetalert2';
import UsuariosContext from '../../Context/Usuarios/usuariosContext';

export default function Register() {

    const usuarioContext = useContext(UsuariosContext);
    const { 
        crearUsuario
    } = usuarioContext;

    let [datosRegistro, setRegistro] = useState({
        nombre: '',
        apellido: '',
        username:'',
        telefono:'',
        email: '',
        password: ''
    })

    const onChage = (e, tip) => {
        if( tip === 'fname' ){
            setRegistro({
                nombre: e.target.value,
                apellido: datosRegistro.apellido,
                username:datosRegistro.username,
                telefono: datosRegistro.telefono,
                email: datosRegistro.email,
                password: datosRegistro.password,
                repetirPassword: datosRegistro.repetirPassword
            })
        }
        else if( tip === 'lname' ){
            setRegistro({
                nombre: datosRegistro.nombre,
                apellido: e.target.value,
                username:datosRegistro.username,
                telefono: datosRegistro.telefono,
                email: datosRegistro.email,
                password: datosRegistro.password,
                repetirPassword: datosRegistro.repetirPassword
            })
        }
        else if( tip === 'usname' ){
            setRegistro({
                nombre: datosRegistro.nombre,
                apellido: datosRegistro.apellido,
                username:e.target.value,
                telefono: datosRegistro.telefono,
                email: datosRegistro.email,
                password: datosRegistro.password,
                repetirPassword: datosRegistro.repetirPassword
            })
        }
        else if( tip === 'tel' ){
            setRegistro({
                nombre: datosRegistro.nombre,
                apellido: datosRegistro.apellido,
                username:datosRegistro.username,
                telefono: e.target.value,
                email: datosRegistro.email,
                password: datosRegistro.password,
                repetirPassword: datosRegistro.repetirPassword
            })
        }
        else if( tip === 'email' ){
            setRegistro({
                nombre: datosRegistro.nombre,
                apellido: datosRegistro.apellido,
                username:datosRegistro.username,
                telefono: datosRegistro.telefono,
                email: e.target.value,
                password: datosRegistro.password,
                repetirPassword: datosRegistro.repetirPassword
            })
        }
        else if( tip === 'pass' ){
            setRegistro({
                nombre: datosRegistro.nombre,
                apellido: datosRegistro.apellido,
                username:datosRegistro.username,
                telefono: datosRegistro.telefono,
                email: datosRegistro.email,
                password: e.target.value,
                repetirPassword: datosRegistro.repetirPassword
            })
        }
        
        
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let datosUser = {
            nombre: datosRegistro.nombre + ' ' + datosRegistro.apellido,
            username:datosRegistro.username,
            telefono: datosRegistro.telefono,
            email: datosRegistro.email,
            password: datosRegistro.password
        }

        crearUsuario(datosUser);

        Swal.fire({
			icon: 'success',
			title: 'Cuenta creada con exito',
			showConfirmButton: false,
			timer: 3000,
		}).then(() => {
            window.location = "/login";
        })

    }

  return (
    <div className='bodyRegister'>
        <div className='zonaContForm'>
            <h1>REGISTER</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="nombre"
                    placeholder='Nombre'
                    onChange={ e => onChage(e, 'fname')}
                    value={datosRegistro.nombre} 
                    required
                ></input>
                <input 
                    type="text" 
                    name="apellido"
                    placeholder='Apellido'
                    onChange={ e => onChage(e, 'lname')}
                    value={datosRegistro.apellido} 
                    required
                ></input>
                <input 
                    type="text" 
                    name="username"
                    placeholder='Nombre Usuario'
                    onChange={ e => onChage(e, 'usname')}
                    value={datosRegistro.username} 
                    required
                ></input>
                <input 
                    type="text" 
                    name="telefono"
                    placeholder='Telefono (opcional)'
                    onChange={ e => onChage(e, 'tel')}
                    value={datosRegistro.telefono} 
                ></input>
                <input 
                    type="email" 
                    name="email"
                    placeholder='Email'
                    onChange={ e => onChage(e, 'email')}
                    value={datosRegistro.email} 
                    required
                ></input>
                <input 
                    type="password" 
                    name="password"
                    placeholder='Contraseña'
                    onChange={ e => onChage(e, 'pass')}
                    value={datosRegistro.password} 
                    required
                ></input>
                
                <div className='contbtnForm'>
                    <input type="submit" value="CREAR" />
                    <Link to='/login' className='goLogin'>
                        Iniciar Secion
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}
