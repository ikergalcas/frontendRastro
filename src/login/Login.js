
import {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'

const CompLogin = () => {
    const[nombreUsuario,setNombreUsuario]=useState('')
    const[contacto,setContacto]=useState('')
    const[ubicacion,setUbicacion]=useState('')
    const navigate = useNavigate()

    const comprobarCredenciales = async (e) =>{
        e.preventDefault()
        console.log(nombreUsuario)
        let raw = JSON.stringify({
            "username": nombreUsuario
          });

        fetch('http://localhost:3003/usuarios/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
          .then(data => {
                console.log(data[0]._id)
                // Actualizar el estado con los productos obtenidos
                if (data[0]){
                    alert("Nombre de usuario existente")
                    window.location.href = `/productos/${data[0]._id}`
                }else{
                    alert("Nombre de usuario incorrecto")
                    window.location.href = '/login'
                }
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    
    function miMetodo() {
        document.getElementById('formInicioSesion').style.display = 'none';
        document.getElementById('formRegistroU').style.display = 'block';
    }

    const registrarUsuario = async (e) =>{
        e.preventDefault()
        let raw = JSON.stringify({
            "contacto": contacto,
            "ubicacion": ubicacion,
            "username": nombreUsuario
          });

        fetch('http://localhost:3003/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.text())
          .then(data => {
                console.log(data)
                window.location.href = `/productos/${data.replace(/"/g, '')}`
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <div className="container">
                <button onClick={volverAtras} className='btn btn-secondary mt-2'> Volver atrás</button>
                <img src='http://res.cloudinary.com/dten77l85/image/upload/v1702032986/ebo5yzb1nfkgr57wqct5.jpg' 
                     style={{display : 'block', height: '60vmin' , width: '100%'}}></img>

            <form id="formInicioSesion" onSubmit={comprobarCredenciales} style={{display: 'block'}}>
                <a>Nombre de usuario:</a><br/>
                <input value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} 
                type="text" id="nombre" className="form-control" required/>
                <br/>
                <button id="iniciarSes" className='btn btn-secondary' type="submit">Iniciar sesion </button>
                <button id="registrarse" className='btn btn-outline-secondary' type='button' onClick={miMetodo} >Registrarse</button>
            </form>
                        
            <form id="formRegistroU" onSubmit={registrarUsuario} style={{display: 'none'}}>
                <a id="textRegister"> Introduce los datos para registrarte</a>
                <br/>
                <a>Nombre de usuario:</a><br/>
                <input value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} 
                type="text" id="nombre" className="form-control" required/>
                <br/>
                <a>Contacto:</a><br/>
                <input value={contacto} onChange={(e) => setContacto(e.target.value)} 
                type="text" id="nombre" className="form-control" required/>
                <br/>
                <a>Ubicacion(Calle, ciudad):</a><br/>
                <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} 
                type="text" id="nombre" className="form-control" required/>
                <br/>
                <button id="registrarIniSes" className='btn btn-secondary'  type="submit">Resgistrar </button>
            </form>
        </div>
    )
}

export default CompLogin 