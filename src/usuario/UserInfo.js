import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShowMapaUsuario from './MapaUsuario.js';
import NavbarPage from "../navbar/navbar.js";


const CompEditUser = () => {

    const [usuario, setUsuario] = useState([]); 
    const {idUsuarioAjeno} = useParams();
    const {idUsuario} = useParams()

    useEffect( () => {getUsuario()}, []);

    const getUsuario = async () => {
        fetch(`http://localhost:3003/usuarios/${idUsuarioAjeno}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setUsuario(data);
            console.log("usuario encontrado")
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }

    return (
        <div>
            <NavbarPage></NavbarPage>
            <div className='container-fluid'>
                <div className='row'>
                    <div className= "col">
                        <div className="container-fluid mt-3 mb-4">
                            <h1>{usuario.username}</h1>
                            <h4> Valoracion
                                { /* Mostrar estrellas según la valoracionMedia */
                                            Array.from({ length: usuario.valoracionMedia }).map((_, index) => (
                                                <span key={index} className="text-warning">&#9733;</span>
                                ))}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8'>
                        <div className= "container-fluid mb-4">
                            <div className='card'>
                                <div className='card-body'>
                                    <h2 className='card-title'> Información del usuario </h2>
                                    Contacto: {usuario.contacto} <br/>
                                    Ubicación: {usuario.ubicacion}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'> 
                        <div className= "container-fluid ">
                            {(usuario.foto == "") ? <img className="card-img-top" src={"http://res.cloudinary.com/dten77l85/image/upload/v1702144932/e3u40bht3yjtycbck0ko.png"} alt={usuario.username} style={{width:'39%'}} /> :
                            <img className="card-img-top" src={usuario.foto} alt={usuario.username} style={{width:'39%'}} /> 
                            }
                        </div>
                    </div>
                </div>

                <div className='row'>
                    
                    {/* <div className='col-4'>
                     <ShowMapaUsuario/>
                    </div> */}

                    <div className='col-8'> 
                        <div className= "container-fluid ">
                            <a href={`/productosUsuario/${idUsuarioAjeno}/${idUsuario}/vendidos`} className='btn btn-outline-secondary'>Productos vendidos</a>
                            <br/>
                            <a href={`/productosUsuario/${idUsuarioAjeno}/${idUsuario}/enVenta`} className='btn btn-outline-secondary mt-2'>Productos en venta</a>
                        </div> 
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompEditUser