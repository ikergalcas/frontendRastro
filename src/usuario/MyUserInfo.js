import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShowMapaUsuario from './MapaUsuario.js';
import NavbarPage from "../navbar/navbar.js";


const CompEditUser = () => {

    const [usuario, setUsuario] = useState([]); 
    const {idUsuario} = useParams();
    const [pendientes, setPendientes] = useState(0)
    useEffect( () => {
        getUsuario()
        getPendientes()
    }, []);

    const getUsuario = async () => {
        fetch(`http://localhost:3003/usuarios/${idUsuario}`, {
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

    const getPendientes = async () => {
        fetch(`http://localhost:3003/usuarios/${idUsuario}/productos/pendientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setPendientes(data.length);
            console.log(data.length);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }

    const subirFotoIdentificativa = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('http://localhost:3003/usuarios/subirFoto', {
                method: 'POST',
                body : formdata
            }).then(response => response.json())
            .then(result =>{
                var raw = JSON.stringify({
                    "foto" : result.imageUrl
                });
                console.log(result.imageUrl)
                fetch(`http://localhost:3003/usuarios/${idUsuario}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: raw
                }).then(response => response.text())
                .then(result => {
                    console.log(result)
                    window.location.href = `/myUserInfo/${idUsuario}`;
                })
                .catch(error => {
                    console.error('Error al subir la imagen:', error);
                });
            })
            .catch(error => {
                console.error('Error al subir la imagen:', error);
            });

        }else{
            alert("Selecciona una foto");   
            console.error('No se seleccionó ningún archivo.');
        }
        
    }

    return (
        <div>
            <NavbarPage></NavbarPage>
            <div className='container-fluid'>
                <div className='row'>
                    <div className= "col">
                        <div className="container-fluid mt-3 mb-4">
                            <h1>{usuario.username}</h1>
                            <h4 className='card-title'>
                                        Valoracion
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
                                <div className='m-2'>
                                    <Link to={`/editarPerfil/${idUsuario}`} className="btn btn-secondary">Editar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'> 
                        <div className= "container ">
                            {(usuario.foto == "") ? 
                            <img src={"http://res.cloudinary.com/dten77l85/image/upload/v1702144932/e3u40bht3yjtycbck0ko.png"} alt={usuario.username} style={{width:'39%'}}  className="card-img-top img-fluid"/> :
                            <img src={usuario.foto} alt={usuario.username} style={{width:'39%'}} className="card-img-top img-fluid" /> 
                            }
                        </div>
                    </div>
                </div> 
                <div className='row mt-3'>
                <div className='col-8'>
                        <div className= "container-fluid ">
                            <a  style={{marginRight: '1%'}} href={`../productosUsuario/${idUsuario}/${idUsuario}/vendidos`} className='btn btn-outline-secondary mt-2'>Productos vendidos</a>
                            
                            <a style={{marginRight: '1%'}} href={`../productosUsuario/${idUsuario}/${idUsuario}/enVenta`} className='btn btn-outline-secondary mt-2'>Productos en venta</a>
                            
                            <a style={{marginRight: '1%'}} href={`../productosUsuario/${idUsuario}/${idUsuario}/pujados`} className='btn btn-outline-secondary mt-2'>Productos pujados</a>
                            
                            <a style={{marginRight: '1%'}} href={`../productosUsuario/${idUsuario}/${idUsuario}/comprados`} className='btn btn-outline-secondary mt-2'>Productos comprados</a>
                        
                            <a style={{marginRight: '1%'}} href={`../productosUsuario/${idUsuario}/${idUsuario}/pendientes`} className='btn btn-outline-secondary mt-2'>Productos pendientes de pago ({pendientes})</a> 
                        </div> 
                    </div>
                    <div className='col-4'>
                        <div className='container-fluid'>
                            <form id="formularioParte2" onSubmit={subirFotoIdentificativa}>
                                <div style={{flexdirection: 'row', width:'90%'}} >
                                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>
                                    <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    {/* <div className='col-4'>
                     <ShowMapaUsuario/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CompEditUser