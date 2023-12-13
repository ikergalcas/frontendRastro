import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavbarPage from "../navbar/navbar.js";


const ShowProductosVendidos = () => {

    const [productos, setProductos] = useState([]); 
    const {idUsuario, filtro} = useParams()
    useEffect( () => {getProductosDeUsuario()}, []);

    const getProductosDeUsuario = async () => {
        fetch(`http://localhost:3003/usuarios/${idUsuario}/productos/${filtro}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setProductos(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }

    const [busqueda, setBusqueda] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const buscarProductos = async (e) => {
        e.preventDefault()

        if(busqueda!="" && !precioMax){
            console.log("desc")
            let raw = JSON.stringify({
                "descripcion": busqueda.toString()
              });
            console.log(raw);
            // Hacer la solicitud para obtener productos desde el backend
            fetch(`http://localhost:3003/usuarios/${idUsuario}/descripcionProductos/${filtro}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });
        }else if (busqueda=="" && precioMax ){
            console.log("precio")
            let raw = JSON.stringify({
                "precio": precioMax
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch(`http://localhost:3003/usuarios/${idUsuario}/precioProductos/${filtro}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });
            
        }else if (busqueda!="" && precioMax){
            console.log("precio y desc");
            let raw = JSON.stringify({
                "descripcion": busqueda.toString(),
                "precio" : precioMax
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch(`http://localhost:3003/usuarios/${idUsuario}/descripcionPrecioProductos/${filtro}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });

        }else{
            limpiarSeleccion()
        }
    }

    const limpiarSeleccion = async () =>{
        setBusqueda("");
        setPrecioMax("");
        getProductosDeUsuario()
    }


    return (
        <div>
            <NavbarPage></NavbarPage>
            <div className="row"> 
                <div class="buscador col 4">
                    <form class="buscador" onSubmit={buscarProductos}>
                        <input value={precioMax} className="barrabusqueda col 1" 
                            onChange={(e) => setPrecioMax(e.target.value)} type="number" placeholder="Precio maximo" />
                        <input value={busqueda} className="barrabusqueda col 1" 
                            onChange={(e) => setBusqueda(e.target.value)} type="string" placeholder="Busca aquí ..." />
                        <button class="botonBusqueda col 1" type="submit" >Buscar</button>
                        <button onClick={limpiarSeleccion} className="btn btn-outline-dark btn-sm col 1" >Limpiar</button>
                    </form>
                </div>
            </div>
            <div className="row" style={{justifyContent: 'center'}}>  
                {productos.length==0 ? (
                    <p> No existen productos vendidos.</p> 
                ) : productos.map(producto => (
                    <div class="card tarjeta col-md-3 col-sm-2" >
                        <div className="card-body">
                            <img className="card-img-top" src={producto.foto} alt={producto.titulo} style={{ objectFit: 'contain', height: '25vmin'}} />
                            <h5 className="card-title">{producto.titulo}</h5>
                            <p className="card-text">{producto.descripcion}</p>
                            <p className="card-text">Maxima puja: {producto.maximaPuja}</p>
                            <a href={`/detallesProducto/${idUsuario}/${producto._id}`} className='btn btn-secondary'>Ver mas informacion</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowProductosVendidos